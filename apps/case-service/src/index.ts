import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import caseRoutes from './routes/case.routes';
import { enforceInternalAccess } from '@legal/shared-utils';
import { logger, requestContext, errorHandler } from '@legal/logger';
import { PORT } from './config';

dotenv.config();

const app = express();

app.use(requestContext('case-service'));

app.use(cors());
app.use(express.json());

app.use('/cases', enforceInternalAccess, caseRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Case service listening on port ${PORT}`);
});
