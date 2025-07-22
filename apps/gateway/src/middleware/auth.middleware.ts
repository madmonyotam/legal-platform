import { Request, Response, NextFunction } from 'express';
import { AUTH_SERVICE_URL } from '../config';
import { setContext, logger, getContext } from '@legal/logger';
import { AppError } from '@legal/shared-utils';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const path = req.path;

  if (!token) {
    return next(new AppError('Missing Authorization header', 401));
  }

  try {
    logger.info('Validating token with auth-service', { path });

    const response = await fetch(`${AUTH_SERVICE_URL}/auth/validate`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      return next(new AppError('Token validation failed', 401, true, { status: response.status }));
    }

    const data = await response.json();
    if (!data.valid) {
      return next(new AppError('Invalid token', 401));
    }

    (req as any).user = data.user;
    setContext({ ...getContext(), userId: data.user?.id });

    logger.info('Token validated successfully', { userId: data.user?.id, path });
    next();
  } catch (err) {
    next(new AppError('Auth service error', 500, false, err));
  }
};
