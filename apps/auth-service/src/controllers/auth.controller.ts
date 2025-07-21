import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config';

const getTokenFromHeader = (req: Request): string | null => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.split(' ')[1];
};

export const health = (_req: Request, res: Response) => {
  res.status(200).send('Auth Service is healthy');
};

export const login = (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
  res.json({ token });
};

export const me = (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const validate = (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);

  if (!token) return res.status(401).json({ valid: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch {
    res.status(401).json({ valid: false });
  }
};

