import type { Request, Response } from 'express';


export const healthCheck = (req: Request, res: Response) => {
  res.status(200).send('Case Service is healthy');
};

export const getCases = (req: Request, res: Response) => {
  res.json({ message: 'All cases' });
};