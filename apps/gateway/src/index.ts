import express from 'express';
import cors from 'cors';
import { logger, requestContext } from '@legal/logger';
import { errorHandler } from '@legal/logger';
import { AppError } from '@legal/shared-utils';
import { authenticate } from './middleware/auth.middleware';
import { CASE_SERVICE_URL, PORT } from './config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestContext('gateway'));

app.get('/health', (_, res) => res.send('Gateway is healthy'));

app.get('/api/cases', authenticate, async (req, res, next) => {
  try {
    const response = await fetch(`${CASE_SERVICE_URL}/cases`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization!,
        'x-internal-auth': process.env.INTERNAL_SECRET!
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return next(new AppError('Case service error', response.status, true, errorBody));
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Gateway listening on port ${PORT}`);
});
