import express from 'express';
import cors from 'cors';
import { authenticate } from './middleware/auth.middleware';
import { CASE_SERVICE_URL, PORT } from './config';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.send('Gateway is healthy'));

// ▶️ ניתוב ל־case-service דרך gateway
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
    console.error('Error contacting case-service:', err);
    res.status(500).json({ error: 'Internal gateway error' });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
