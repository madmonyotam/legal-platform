import type { Request, Response } from 'express';
import { logger } from '@legal/logger';

export const healthCheck = (req: Request, res: Response) => {
  logger.info('GET /health - healthCheck called');
  res.status(200).send('Case Service is healthy');
};

export const getCases = (req: Request, res: Response) => {
  logger.info('GET /cases - getCases called');

  try {
    const result = { message: 'All cases' };

    logger.debug('Response:', result);
    res.json(result);
  } catch (err) {
    logger.error('Failed to fetch cases', { error: err });
    res.status(500).json({ error: 'Internal server error' });
  }
};
