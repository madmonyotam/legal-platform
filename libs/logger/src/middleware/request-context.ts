import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { setContext } from '../logger';

export const requestContext = (serviceName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const traceId = (req.headers['x-trace-id'] as string) || uuid();
        const userId = (req as any).user?.id;

        setContext({
            service: serviceName,
            traceId,
            userId,
        });

        res.setHeader('x-trace-id', traceId);
        next();
    };
};
