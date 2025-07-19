import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

//temp
app.get('/debug-env', (_, res) => {
  res.send(`CASE_SECRET: ${process.env.CASE_SECRET}`);
});

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
