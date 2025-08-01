import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config';
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
  const token = getTokenFromHeader(req);
  if (!token) throw new AppError('No token provided', 401);

  const decoded = jwt.verify(token, JWT_SECRET);
  res.json({ valid: true, user: decoded });
};
