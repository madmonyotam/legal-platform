import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { PORT } from './config';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

//temp
app.get('/debug-env', (_, res) => {
  res.send(`JWT_SECRET: ${process.env.JWT_SECRET}`);
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
