import type { Request, Response } from 'express';

export const getCases = (req: Request, res: Response) => {
  res.json({ message: 'All cases' });
};