import type { Request, Response } from 'express';
import { logger } from '@legal/logger';

export const getCases = async (req: Request, res: Response) => {
  logger.info('GET /cases - getCases called');

  const result = { message: 'All cases' };

  logger.debug('Response:', result);
  res.json(result);
};
