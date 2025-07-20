import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import caseRoutes from './routes/case.routes';
import { enforceInternalAccess } from '@shared-utils/middleware/internal-access';

dotenv.config();

const app = express();
const port = process.env.PORT || 8082;


app.use(cors());
app.use(express.json());

app.use('/cases',enforceInternalAccess, caseRoutes);

//temp
app.get('/debug-env', (_, res) => {
  res.send(`CASE_SECRET: ${process.env.CASE_SECRET}`);
});

app.listen(port, () => {
  console.log(`Case service running on port  ${port}`);
});



