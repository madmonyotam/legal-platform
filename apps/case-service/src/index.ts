import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import caseRoutes from './routes/case.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());

app.use('/cases', caseRoutes);

//temp
app.get('/debug-env', (_, res) => {
  res.send(`CASE_SECRET: ${process.env.CASE_SECRET}`);
});

app.listen(port, () => {
  console.log(`Case service running on port  ${port}`);
});



