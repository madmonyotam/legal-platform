import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import caseRoutes from './routes/case.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.status(200).send('Case Service is healthy');
});

app.use('/cases', caseRoutes);

app.get('/debug-env', (_, res) => {
  res.send(`JWT_SECRET: ${process.env.JWT_SECRET}`);
});

app.listen(port, () => {
  console.log(`Case service running on port  ${port}`);
});



