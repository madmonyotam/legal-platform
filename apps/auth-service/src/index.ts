import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { PORT } from './config';
import { logger, requestContext, errorHandler } from '@legal/logger';

dotenv.config();

import net from 'net';

const testPostgresPort = (host: string, port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 3000;

    socket.setTimeout(timeout);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });

    socket.connect(port, host);
  });
}

const app = express();

app.use(requestContext('auth-service'));

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('debug/ping', async (req, res) => {
  const ok = await testPostgresPort('35.195.33.117', 5432);
  res.send({ reachable: ok });
});

app.get('/auth/debug/ip', async (req, res) => {
  try {
    const ip = await fetch('https://api.ipify.org').then(r => r.text());
    res.send(`Egress IP: ${ip}`);
  } catch (err) {
    res.status(500).send('Failed to detect IP');
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT}`);
});
