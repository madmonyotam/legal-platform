import type { Request, Response, NextFunction } from 'express';

export const enforceInternalAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const internalHeader = req.headers['x-internal-auth'];
  if (internalHeader !== process.env.INTERNAL_SECRET) {
    return res.status(403).json({ error: 'Forbidden – external access denied' });
  }
  next();
};
