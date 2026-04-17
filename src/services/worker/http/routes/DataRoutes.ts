/**
 * Data Routes
 *
 * Handles data retrieval: observations, summaries, prompts, stats, processing status.
 * All endpoints are now backed by the Markdown vault. The legacy /api/import,
 * /api/sdk-sessions/batch, and /api/pending-queue/* endpoints were removed in
 * the vault-only refactor.
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { readFileSync } from 'fs';
import { getPackageRoot } from '../../../../shared/paths.js';
import { logger } from '../../../../utils/logger.js';
import { getWorkerPort } from '../../../../shared/worker-utils.js';
import { PaginationHelper } from '../../PaginationHelper.js';
import { DatabaseManager } from '../../DatabaseManager.js';
import { SessionManager } from '../../SessionManager.js';
import { SSEBroadcaster } from '../../SSEBroadcaster.js';
import type { WorkerService } from '../../../worker-service.js';
import { BaseRouteHandler } from '../BaseRouteHandler.js';
import { normalizePlatformSource } from '../../../../shared/platform-source.js';

export class DataRoutes extends BaseRouteHandler {
  constructor(
    private paginationHelper: PaginationHelper,
    private dbManager: DatabaseManager,
    private sessionManager: SessionManager,
    private sseBroadcaster: SSEBroadcaster,
    private workerService: WorkerService,
    private startTime: number
  ) {
    super();
  }

  setupRoutes(app: express.Application): void {
    // Pagination endpoints
    app.get('/api/observations', this.handleGetObservations.bind(this));
    app.get('/api/summaries', this.handleGetSummaries.bind(this));
    app.get('/api/prompts', this.handleGetPrompts.bind(this));

    // Fetch by ID endpoints
    app.get('/api/observation/:id', this.handleGetObservationById.bind(this));
    app.get('/api/observations/by-file', this.handleGetObservationsByFile.bind(this));
    app.post('/api/observations/batch', this.handleGetObservationsByIds.bind(this));
    app.get('/api/session/:id', this.handleGetSessionById.bind(this));
    app.get('/api/prompt/:id', this.handleGetPromptById.bind(this));

    // Metadata endpoints
    app.get('/api/stats', this.handleGetStats.bind(this));
    app.get('/api/projects', this.handleGetProjects.bind(this));

    // Processing status endpoints
    app.get('/api/processing-status', this.handleGetProcessingStatus.bind(this));
    app.post('/api/processing', this.handleSetProcessing.bind(this));

    logger.debug('HTTP', 'DataRoutes registered');
  }

  private handleGetObservations = this.wrapHandler((req: Request, res: Response): void => {
    const { offset, limit, project, platformSource } = this.parsePaginationParams(req);
    const result = this.paginationHelper.getObservations(offset, limit, project, platformSource);
    res.json(result);
  });

  private handleGetSummaries = this.wrapHandler((req: Request, res: Response): void => {
    const { offset, limit, project, platformSource } = this.parsePaginationParams(req);
    const result = this.paginationHelper.getSummaries(offset, limit, project, platformSource);
    res.json(result);
  });

  private handleGetPrompts = this.wrapHandler((req: Request, res: Response): void => {
    const { offset, limit, project, platformSource } = this.parsePaginationParams(req);
    const result = this.paginationHelper.getPrompts(offset, limit, project, platformSource);
    res.json(result);
  });

  private handleGetObservationById = this.wrapHandler((req: Request, res: Response): void => {
    const id = this.parseIntParam(req, res, 'id');
    if (id === null) return;

    const store = this.dbManager.getSessionStore();
    const observation = store.getObservationById(id);

    if (!observation) {
      this.notFound(res, `Observation #${id} not found`);
      return;
    }
    res.json(observation);
  });

  /**
   * GET /api/observations/by-file?path=...&projects=a,b&limit=15
   * Returns observations whose files_read or files_modified array includes
   * a substring match on the supplied path.
   */
  private handleGetObservationsByFile = this.wrapHandler((req: Request, res: Response): void => {
    const filePath = req.query.path as string | undefined;
    if (!filePath) {
      this.badRequest(res, 'path query parameter is required');
      return;
    }

    const projectsParam = req.query.projects as string | undefined;
    const projects = projectsParam ? projectsParam.split(',').filter(Boolean) : undefined;
    const parsedLimit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const limit = Number.isFinite(parsedLimit) && parsedLimit! > 0 ? parsedLimit : undefined;

    const vault = this.dbManager.getVaultStore();
    let matches = vault.listObservations({ files: filePath });
    if (projects && projects.length > 0) {
      matches = matches.filter((o) => projects.includes(o.project));
    }
    if (typeof limit === 'number') matches = matches.slice(0, limit);
    res.json({ observations: matches, count: matches.length });
  });

  /**
   * POST /api/observations/batch
   * Body: { ids: number[], orderBy?, limit?, project? }
   */
  private handleGetObservationsByIds = this.wrapHandler((req: Request, res: Response): void => {
    let { ids, orderBy, limit, project } = req.body;

    if (typeof ids === 'string') {
      try { ids = JSON.parse(ids); } catch { ids = ids.split(',').map(Number); }
    }
    if (!ids || !Array.isArray(ids)) {
      this.badRequest(res, 'ids must be an array of numbers');
      return;
    }
    if (ids.length === 0) {
      res.json([]);
      return;
    }
    if (!ids.every(id => typeof id === 'number' && Number.isInteger(id))) {
      this.badRequest(res, 'All ids must be integers');
      return;
    }

    const store = this.dbManager.getSessionStore();
    const observations = store.getObservationsByIds(ids, { orderBy, limit, project });
    res.json(observations);
  });

  private handleGetSessionById = this.wrapHandler((req: Request, res: Response): void => {
    const id = this.parseIntParam(req, res, 'id');
    if (id === null) return;

    const store = this.dbManager.getSessionStore();
    const sessions = store.getSessionSummariesByIds([id]);

    if (sessions.length === 0) {
      this.notFound(res, `Session #${id} not found`);
      return;
    }
    res.json(sessions[0]);
  });

  private handleGetPromptById = this.wrapHandler((req: Request, res: Response): void => {
    const id = this.parseIntParam(req, res, 'id');
    if (id === null) return;

    const store = this.dbManager.getSessionStore();
    const prompts = store.getUserPromptsByIds([id]);

    if (prompts.length === 0) {
      this.notFound(res, `Prompt #${id} not found`);
      return;
    }
    res.json(prompts[0]);
  });

  /**
   * Lightweight worker + vault stats (formerly SELECT COUNT(*) from SQLite).
   */
  private handleGetStats = this.wrapHandler((_req: Request, res: Response): void => {
    const packageJson = JSON.parse(
      readFileSync(path.join(getPackageRoot(), 'package.json'), 'utf-8')
    );
    const version = packageJson.version;

    const vault = this.dbManager.getVaultStore();
    const totalObservations = vault.countObservations();
    const allSessions = vault.listSessions();
    let totalSummaries = 0;
    for (const s of allSessions) {
      if (s.memory_session_id && vault.getSummaryForSession(s.memory_session_id)) {
        totalSummaries++;
      }
    }

    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    const activeSessions = this.sessionManager.getActiveSessionCount();
    const sseClients = this.sseBroadcaster.getClientCount();

    res.json({
      worker: {
        version,
        uptime,
        activeSessions,
        sseClients,
        port: getWorkerPort(),
      },
      database: {
        path: vault.getPaths().root,
        size: 0,
        observations: totalObservations,
        sessions: allSessions.length,
        summaries: totalSummaries,
      },
    });
  });

  private handleGetProjects = this.wrapHandler((req: Request, res: Response): void => {
    const store = this.dbManager.getSessionStore();
    const rawPlatformSource = req.query.platformSource as string | undefined;
    const platformSource = rawPlatformSource ? normalizePlatformSource(rawPlatformSource) : undefined;

    if (platformSource) {
      const projects = store.getAllProjects(platformSource);
      res.json({
        projects,
        sources: [platformSource],
        projectsBySource: { [platformSource]: projects },
      });
      return;
    }

    res.json(store.getProjectCatalog());
  });

  private handleGetProcessingStatus = this.wrapHandler((_req: Request, res: Response): void => {
    const isProcessing = this.sessionManager.isAnySessionProcessing();
    const queueDepth = this.sessionManager.getTotalActiveWork();
    res.json({ isProcessing, queueDepth });
  });

  private handleSetProcessing = this.wrapHandler((_req: Request, res: Response): void => {
    this.workerService.broadcastProcessingStatus();
    const isProcessing = this.sessionManager.isAnySessionProcessing();
    const queueDepth = this.sessionManager.getTotalQueueDepth();
    const activeSessions = this.sessionManager.getActiveSessionCount();
    res.json({ status: 'ok', isProcessing, queueDepth, activeSessions });
  });

  private parsePaginationParams(req: Request): { offset: number; limit: number; project?: string; platformSource?: string } {
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = Math.min(parseInt(req.query.limit as string, 10) || 20, 100);
    const project = req.query.project as string | undefined;
    const rawPlatformSource = req.query.platformSource as string | undefined;
    const platformSource = rawPlatformSource ? normalizePlatformSource(rawPlatformSource) : undefined;
    return { offset, limit, project, platformSource };
  }
}
