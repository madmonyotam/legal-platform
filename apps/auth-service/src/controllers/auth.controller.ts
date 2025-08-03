import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { AppError } from '@legal/shared-utils';

const getTokenFromHeader = (req: Request): string | null => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.split(' ')[1];
};

export const health = (_req: Request, res: Response) => {
  res.status(200).send('Auth Service is healthy');
};

export const validate = async (req: Request, res: Response) => {
  // נסה לקבל טוקן מ-header או מ-body
  let token = getTokenFromHeader(req);

  // אם אין ב-header, נסה ב-body
  if (!token && req.body.token) {
    token = req.body.token;
  }

  if (!token) throw new AppError('No token provided', 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
};
