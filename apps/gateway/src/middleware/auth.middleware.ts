import { Request, Response, NextFunction } from 'express';
import { AUTH_SERVICE_URL } from '../config';
import { setContext, logger, getContext } from '@legal/logger';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const path = req.path;

  if (!token) {
    logger.warn('Missing Authorization header', { path });
    return res.status(401).json({ error: 'Missing Authorization header' });
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
      logger.warn('Token validation failed (bad response)', { status: response.status, path });
      return res.status(401).json({ error: 'Token validation failed' });
    }

    const data = await response.json();
    if (!data.valid) {
      logger.warn('Invalid token from auth-service', { path });
      return res.status(401).json({ error: 'Invalid token' });
    }

    (req as any).user = data.user;
    setContext({ ...getContext(), userId: data.user?.id });
    logger.info('Token validated successfully', { userId: data.user?.id, path });
    next();
  } catch (err) {
    logger.error('Auth validation error', { path, error: err });
    res.status(500).json({ error: 'Auth service error' });
  }
};
