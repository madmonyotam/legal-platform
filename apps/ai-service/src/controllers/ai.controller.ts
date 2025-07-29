import type { Request, Response } from 'express';
import { logger } from '@legal/logger';

export const healthCheck = (req: Request, res: Response) => {
  logger.info('GET /health - healthCheck called');
  res.status(200).send('AI Service is healthy');
};

export const getAiInfo = async (req: Request, res: Response) => {
  logger.info('GET /ai - getAiInfo called');
  
  const result = { 
    service: 'ai-service',
    status: 'running',
    message: 'AI Service is ready' 
  };

  logger.debug('Response:', result);
  res.json(result);
};