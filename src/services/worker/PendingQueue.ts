/**
 * In-memory work queue replacing the legacy SQLite-backed PendingMessageStore.
 *
 * Durability trade-off: messages no longer survive a worker crash. The hook-side
 * retry logic (client-side) will re-enqueue lost work on next invocation.
 *
 * Implements the same public API surface that SessionManager, SessionQueueProcessor,
 * SessionRoutes and DataRoutes consume, so the swap is mechanical.
 */

import type { PendingMessage } from '../worker-types.js';
import { logger } from '../../utils/logger.js';

const STALE_PROCESSING_THRESHOLD_MS = 60_000;

export interface PersistentPendingMessage {
  id: number;
  session_db_id: number;
  content_session_id: string;
  message_type: 'observation' | 'summarize';
  tool_name: string | null;
  tool_input: string | null;
  tool_response: string | null;
  cwd: string | null;
  last_assistant_message: string | null;
  prompt_number: number | null;
  status: 'pending' | 'processing' | 'processed' | 'failed';
  retry_count: number;
  created_at_epoch: number;
  started_processing_at_epoch: number | null;
  completed_at_epoch: number | null;
  failed_at_epoch?: number | null;
  project?: string | null;
}

export class PendingQueue {
  private readonly messages = new Map<number, PersistentPendingMessage>();
  private nextId = 1;

  constructor(private readonly maxRetries: number = 3) {}

  enqueue(sessionDbId: number, contentSessionId: string, message: PendingMessage): number {
    const id = this.nextId++;
    const record: PersistentPendingMessage = {
      id,
      session_db_id: sessionDbId,
      content_session_id: contentSessionId,
      message_type: message.type,
      tool_name: message.tool_name ?? null,
      tool_input: message.tool_input ? JSON.stringify(message.tool_input) : null,
      tool_response: message.tool_response ? JSON.stringify(message.tool_response) : null,
      cwd: message.cwd ?? null,
      last_assistant_message: message.last_assistant_message ?? null,
      prompt_number: message.prompt_number ?? null,
      status: 'pending',
      retry_count: 0,
      created_at_epoch: Date.now(),
      started_processing_at_epoch: null,
      completed_at_epoch: null,
    };
    this.messages.set(id, record);
    return id;
  }

  claimNextMessage(sessionDbId: number): PersistentPendingMessage | null {
    const now = Date.now();
    const staleCutoff = now - STALE_PROCESSING_THRESHOLD_MS;
    let healed = 0;
    for (const m of this.messages.values()) {
      if (
        m.session_db_id === sessionDbId &&
        m.status === 'processing' &&
        m.started_processing_at_epoch !== null &&
        m.started_processing_at_epoch < staleCutoff
      ) {
        m.status = 'pending';
        m.started_processing_at_epoch = null;
        healed++;
      }
    }
    if (healed > 0) {
      logger.info('QUEUE', `SELF_HEAL | sessionDbId=${sessionDbId} | recovered ${healed} stale processing message(s)`);
    }

    // Claim the oldest pending message for this session.
    let target: PersistentPendingMessage | null = null;
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && m.status === 'pending') {
        if (!target || m.id < target.id) target = m;
      }
    }
    if (target) {
      target.status = 'processing';
      target.started_processing_at_epoch = now;
      logger.info('QUEUE', `CLAIMED | sessionDbId=${sessionDbId} | messageId=${target.id} | type=${target.message_type}`, {
        sessionId: sessionDbId,
      });
    }
    return target;
  }

  confirmProcessed(messageId: number): void {
    if (this.messages.delete(messageId)) {
      logger.debug('QUEUE', `CONFIRMED | messageId=${messageId} | deleted from queue`);
    }
  }

  resetStaleProcessingMessages(thresholdMs: number = 5 * 60 * 1000, sessionDbId?: number): number {
    const cutoff = Date.now() - thresholdMs;
    let count = 0;
    for (const m of this.messages.values()) {
      if (
        m.status === 'processing' &&
        m.started_processing_at_epoch !== null &&
        m.started_processing_at_epoch < cutoff &&
        (sessionDbId === undefined || m.session_db_id === sessionDbId)
      ) {
        m.status = 'pending';
        m.started_processing_at_epoch = null;
        count++;
      }
    }
    if (count > 0) {
      logger.info('QUEUE', `RESET_STALE | count=${count} | thresholdMs=${thresholdMs}${sessionDbId !== undefined ? ` | sessionDbId=${sessionDbId}` : ''}`);
    }
    return count;
  }

  getAllPending(sessionDbId: number): PersistentPendingMessage[] {
    const out: PersistentPendingMessage[] = [];
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && m.status === 'pending') out.push(m);
    }
    return out.sort((a, b) => a.id - b.id);
  }

  getQueueMessages(): (PersistentPendingMessage & { project: string | null })[] {
    const statusPriority: Record<string, number> = { failed: 0, processing: 1, pending: 2 };
    const out: (PersistentPendingMessage & { project: string | null })[] = [];
    for (const m of this.messages.values()) {
      if (m.status === 'pending' || m.status === 'processing' || m.status === 'failed') {
        out.push({ ...m, project: m.project ?? null });
      }
    }
    out.sort((a, b) => {
      const p = (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
      if (p !== 0) return p;
      return a.created_at_epoch - b.created_at_epoch;
    });
    return out;
  }

  getStuckCount(thresholdMs: number): number {
    const cutoff = Date.now() - thresholdMs;
    let count = 0;
    for (const m of this.messages.values()) {
      if (m.status === 'processing' && m.started_processing_at_epoch !== null && m.started_processing_at_epoch < cutoff) {
        count++;
      }
    }
    return count;
  }

  retryMessage(messageId: number): boolean {
    const m = this.messages.get(messageId);
    if (!m) return false;
    if (m.status !== 'pending' && m.status !== 'processing' && m.status !== 'failed') return false;
    m.status = 'pending';
    m.started_processing_at_epoch = null;
    return true;
  }

  resetProcessingToPending(sessionDbId: number): number {
    let count = 0;
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && m.status === 'processing') {
        m.status = 'pending';
        m.started_processing_at_epoch = null;
        count++;
      }
    }
    return count;
  }

  markSessionMessagesFailed(sessionDbId: number): number {
    const now = Date.now();
    let count = 0;
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && m.status === 'processing') {
        m.status = 'failed';
        m.failed_at_epoch = now;
        count++;
      }
    }
    return count;
  }

  markAllSessionMessagesAbandoned(sessionDbId: number): number {
    const now = Date.now();
    let count = 0;
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && (m.status === 'pending' || m.status === 'processing')) {
        m.status = 'failed';
        m.failed_at_epoch = now;
        count++;
      }
    }
    return count;
  }

  abortMessage(messageId: number): boolean {
    return this.messages.delete(messageId);
  }

  retryAllStuck(thresholdMs: number): number {
    return this.resetStaleProcessingMessages(thresholdMs);
  }

  getRecentlyProcessed(_limit: number = 10, _withinMinutes: number = 30): (PersistentPendingMessage & { project: string | null })[] {
    // Processed messages are deleted; nothing to return in the in-memory model.
    return [];
  }

  markFailed(messageId: number): void {
    const m = this.messages.get(messageId);
    if (!m) return;
    if (m.retry_count < this.maxRetries) {
      m.status = 'pending';
      m.retry_count += 1;
      m.started_processing_at_epoch = null;
    } else {
      m.status = 'failed';
      m.completed_at_epoch = Date.now();
    }
  }

  resetStuckMessages(thresholdMs: number): number {
    return this.resetStaleProcessingMessages(thresholdMs);
  }

  getPendingCount(sessionDbId: number): number {
    let count = 0;
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && (m.status === 'pending' || m.status === 'processing')) {
        count++;
      }
    }
    return count;
  }

  peekPendingTypes(sessionDbId: number): Array<{ message_type: string; tool_name: string | null }> {
    const out: Array<{ message_type: string; tool_name: string | null; id: number }> = [];
    for (const m of this.messages.values()) {
      if (m.session_db_id === sessionDbId && (m.status === 'pending' || m.status === 'processing')) {
        out.push({ message_type: m.message_type, tool_name: m.tool_name, id: m.id });
      }
    }
    out.sort((a, b) => a.id - b.id);
    return out.map(({ message_type, tool_name }) => ({ message_type, tool_name }));
  }

  hasAnyPendingWork(): boolean {
    this.resetStaleProcessingMessages(5 * 60 * 1000);
    for (const m of this.messages.values()) {
      if (m.status === 'pending' || m.status === 'processing') return true;
    }
    return false;
  }

  getSessionsWithPendingMessages(): number[] {
    const set = new Set<number>();
    for (const m of this.messages.values()) {
      if (m.status === 'pending' || m.status === 'processing') set.add(m.session_db_id);
    }
    return [...set];
  }

  getSessionInfoForMessage(messageId: number): { sessionDbId: number; contentSessionId: string } | null {
    const m = this.messages.get(messageId);
    if (!m) return null;
    return { sessionDbId: m.session_db_id, contentSessionId: m.content_session_id };
  }

  clearFailed(): number {
    let count = 0;
    for (const [id, m] of this.messages) {
      if (m.status === 'failed') {
        this.messages.delete(id);
        count++;
      }
    }
    return count;
  }

  clearAll(): number {
    let count = 0;
    for (const [id, m] of this.messages) {
      if (m.status === 'pending' || m.status === 'processing' || m.status === 'failed') {
        this.messages.delete(id);
        count++;
      }
    }
    return count;
  }

  toPendingMessage(persistent: PersistentPendingMessage): PendingMessage {
    return {
      type: persistent.message_type,
      tool_name: persistent.tool_name || undefined,
      tool_input: persistent.tool_input ? JSON.parse(persistent.tool_input) : undefined,
      tool_response: persistent.tool_response ? JSON.parse(persistent.tool_response) : undefined,
      prompt_number: persistent.prompt_number || undefined,
      cwd: persistent.cwd || undefined,
      last_assistant_message: persistent.last_assistant_message || undefined,
    };
  }
}
