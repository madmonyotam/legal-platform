import { Request, Response, NextFunction } from 'express';
import { logger } from '@legal/logger';
import { AppError } from '@legal/shared-utils';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const isAppError = err instanceof AppError;

  const status = isAppError ? err.statusCode : 500;
  const message = isAppError && err.isOperational
    ? err.message
    : 'Internal Server Error';

  const details = isAppError ? err.details : undefined;

  logger.error('Unhandled error', {
    name: err.name,
    message: err.message,
    status,
    path: req.path,
    stack: err.stack,
    details,
  });

  res.status(status).json({
    error: message,
    ...(details && { details })
  });
};
