import type { Request, Response, NextFunction } from 'express';

export const enforceInternalAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const internalHeader = req.headers['x-internal-auth'] as string;
  if (internalHeader.trim() !== process.env.INTERNAL_SECRET?.trim()) {
    return res.status(403).json({ error: 'Forbidden – external access denied' });
  }
  next();
};
