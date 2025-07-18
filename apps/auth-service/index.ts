import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('Auth Service is healthy');
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/me', (req, res) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(auth, JWT_SECRET);
    res.json(decoded);
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
