import express from 'express';
import cors from 'cors';
import { logger, requestContext } from '@legal/logger';
import { errorHandler } from '@legal/logger';
import { AppError, corsMiddleware, catchAsync } from '@legal/shared-utils';
import { authenticate } from './middleware/auth.middleware';
import {
  AI_SERVICE_URL,
  AUTH_SERVICE_URL,
  CASE_SERVICE_URL,
  CLIENTS_SERVICE_URL,
  INTERNAL_SECRET,
  PORT,
} from './config';
import { proxyRequest } from './utils/proxy';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(requestContext('gateway'));

app.get('/health', (_, res) => res.send('Gateway is healthy'));

// === Public Auth Routes ===

app.post('/api/auth/login', catchAsync(async (req, res) => {
  const data = await proxyRequest(req, `${AUTH_SERVICE_URL}/auth/login`, 'Auth');
  res.status(200).json(data);
}));

app.post('/api/auth/validate', catchAsync(async (req, res) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (req.headers.authorization) {
    headers['Authorization'] = req.headers.authorization;
  }

  const data = await proxyRequest(
    req,
    `${AUTH_SERVICE_URL}/auth/validate`,
    'Auth',
    headers
  );

  res.status(200).json(data);
}));

// === Protected Routes ===

app.get('/api/cases', authenticate, catchAsync(async (req, res) => {
  const data = await proxyRequest(req, `${CASE_SERVICE_URL}/cases`, 'Case');
  res.json(data);
}));

app.get('/api/ai', authenticate, catchAsync(async (req, res) => {
  const data = await proxyRequest(req, `${AI_SERVICE_URL}/ai`, 'AI');
  res.json(data);
}));

app.get('/api/clients/health', authenticate, catchAsync(async (req, res) => {
  const data = await proxyRequest(req, `${CLIENTS_SERVICE_URL}/clients/health`, 'Clients');
  logger.info('GET /clients/health - Clients service health check', { data });
  res.json(data);
}));

app.post('/api/auth/invite', authenticate, catchAsync(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new AppError('Unauthenticated', 401);

  const { email, password, role, officeId } = req.body;
  const body = { email, password, role, officeId };

  const data = await proxyRequest(
    req,
    `${AUTH_SERVICE_URL}/auth/invite`,
    'Auth',
    { 'x-user-meta': JSON.stringify(user) },
    body
  );

  res.json(data);
}));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Gateway listening on port ${PORT}`);
});
