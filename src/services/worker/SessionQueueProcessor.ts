import { EventEmitter } from 'events';
import { PendingQueue, PersistentPendingMessage } from './PendingQueue.js';
import type { PendingMessageWithId } from '../worker-types.js';
import { logger } from '../../utils/logger.js';

const IDLE_TIMEOUT_MS = 3 * 60 * 1000;

export interface CreateIteratorOptions {
  sessionDbId: number;
  signal: AbortSignal;
  /** Called when idle timeout occurs - should trigger abort to kill subprocess */
  onIdleTimeout?: () => void;
}

/**
 * Async iterator over an in-memory pending queue. Yields claimed messages
 * until the queue drains, then waits up to IDLE_TIMEOUT_MS for a wake-up
 * event before triggering the caller's idle-abort hook.
 */
export class SessionQueueProcessor {
  constructor(private store: PendingQueue, private events: EventEmitter) {}

  async *createIterator(options: CreateIteratorOptions): AsyncIterableIterator<PendingMessageWithId> {
    const { sessionDbId, signal, onIdleTimeout } = options;
    let lastActivityTime = Date.now();

    while (!signal.aborted) {
      try {
        const persistentMessage = this.store.claimNextMessage(sessionDbId);

        if (persistentMessage) {
          lastActivityTime = Date.now();
          yield this.toPendingMessageWithId(persistentMessage);
        } else {
          const receivedMessage = await this.waitForMessage(signal, IDLE_TIMEOUT_MS);

          if (!receivedMessage && !signal.aborted) {
            const idleDuration = Date.now() - lastActivityTime;
            if (idleDuration >= IDLE_TIMEOUT_MS) {
              logger.info('SESSION', 'Idle timeout reached, triggering abort to kill subprocess', {
                sessionDbId,
                idleDurationMs: idleDuration,
                thresholdMs: IDLE_TIMEOUT_MS,
              });
              onIdleTimeout?.();
              return;
            }
            lastActivityTime = Date.now();
          }
        }
      } catch (error) {
        if (signal.aborted) return;
        logger.error('SESSION', 'Error in queue processor loop', { sessionDbId }, error as Error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  private toPendingMessageWithId(msg: PersistentPendingMessage): PendingMessageWithId {
    const pending = this.store.toPendingMessage(msg);
    return {
      ...pending,
      _persistentId: msg.id,
      _originalTimestamp: msg.created_at_epoch,
    };
  }

  private waitForMessage(signal: AbortSignal, timeoutMs: number = IDLE_TIMEOUT_MS): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;

      const onMessage = () => {
        cleanup();
        resolve(true);
      };
      const onAbort = () => {
        cleanup();
        resolve(false);
      };
      const onTimeout = () => {
        cleanup();
        resolve(false);
      };
      const cleanup = () => {
        if (timeoutId !== undefined) clearTimeout(timeoutId);
        this.events.off('message', onMessage);
        signal.removeEventListener('abort', onAbort);
      };

      this.events.once('message', onMessage);
      signal.addEventListener('abort', onAbort, { once: true });
      timeoutId = setTimeout(onTimeout, timeoutMs);
    });
  }
}
