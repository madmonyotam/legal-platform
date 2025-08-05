import type { Request, Response } from 'express';
import { logger } from '@legal/logger';

export const healthCheck = (_req: Request, res: Response) => {
  logger.info('GET /health - healthCheck called');
  const result = { message: 'Clients Service is healthy' };
  // res.status(200).send('Clients Service is healthy');

};