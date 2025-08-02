import express from 'express';
import cors from 'cors';
import { logger, requestContext } from '@legal/logger';
import { errorHandler } from '@legal/logger';
import { AppError } from '@legal/shared-utils';
import { authenticate } from './middleware/auth.middleware';
import { AI_SERVICE_URL, AUTH_SERVICE_URL, CASE_SERVICE_URL, INTERNAL_SECRET, PORT } from './config';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
        'x-internal-auth': INTERNAL_SECRET
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

app.get('/api/ai', authenticate, async (req, res, next) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/ai`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization!,
        'x-internal-auth': INTERNAL_SECRET
      }
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return next(new AppError('Ai service error', response.status, true, errorBody));
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/invite', authenticate, async (req, res, next) => {
  const user = (req as any).user;
  const { email, password, role, officeId } = req.body;

  if (!user) {
    return next(new AppError('Unauthenticated', 401));
  }

  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization!,          // עובר הלאה אם auth-service צריך
        'x-internal-auth': INTERNAL_SECRET,                   // הגנה פנימית
        'x-user-meta': JSON.stringify(user),                  // מעביר מידע על המזמין
      },
      body: JSON.stringify({ email, password, role, officeId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return next(new AppError('Invite failed', response.status, true, data));
    }

    res.status(response.status).json(data);
  } catch (err) {
    next(new AppError('Auth service unavailable', 500, false, err));
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Gateway listening on port ${PORT}`);
});
