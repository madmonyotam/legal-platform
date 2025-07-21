import express from 'express';
import cors from 'cors';
import { logger } from '@legal/logger';
import { authenticate } from './middleware/auth.middleware';
import { CASE_SERVICE_URL, PORT } from './config';
import { requestContext } from './middleware/request-context.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestContext);

app.get('/health', (_, res) => res.send('Gateway is healthy'));

app.get('/api/cases', authenticate, async (req, res) => {
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
      return res.status(response.status).json({ error: 'Case service error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    logger.error('Error contacting case-service', {
      error: err,
      path: req.path
    });
    res.status(500).json({ error: 'Internal gateway error' });
  }
});

app.listen(PORT, () => {
  logger.info(`Gateway listening on port ${PORT}`);
});
