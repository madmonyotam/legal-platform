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

export const login = async (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) throw new AppError('Missing username', 400);

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
  res.json({ token });
};

export const me = async (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) throw new AppError('No token provided', 401);

  const decoded = jwt.verify(token, JWT_SECRET);
  res.json({ user: decoded });
};

export const validate = async (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) throw new AppError('No token provided', 401);

  const decoded = jwt.verify(token, JWT_SECRET);
  res.json({ valid: true, user: decoded });
};
