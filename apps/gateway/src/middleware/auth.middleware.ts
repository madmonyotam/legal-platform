import { Request, Response, NextFunction } from 'express';
import { AUTH_SERVICE_URL } from '../config';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/validate`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ error: 'Token validation failed' });
    }

    const data = await response.json();
    if (!data.valid) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    (req as any).user = data.user;
    next();
  } catch (err) {
    console.error('Auth validation error:', err);
    res.status(500).json({ error: 'Auth service error' });
  }
};
