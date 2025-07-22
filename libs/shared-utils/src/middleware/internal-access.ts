import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@legal/shared-utils';

export const enforceInternalAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const internalHeader = req.headers['x-internal-auth'] as string;

  if (internalHeader !== process.env.INTERNAL_SECRET?.trim()) {
    return next(new AppError('Forbidden – external access denied', 403));
  }

  next();
};
