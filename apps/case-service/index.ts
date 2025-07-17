import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('Case Service is healthy');
});

app.get('/debug-env', (req, res) => {
  res.send(`JWT_SECRET: ${process.env.JWT_SECRET}`);
});

app.listen(port, () => {
  console.log(`Case service running on port ${port}`);
});
