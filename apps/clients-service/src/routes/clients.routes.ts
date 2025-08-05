import { Router } from 'express';
import { catchAsync } from '@legal/shared-utils';
import { healthCheck } from '../controllers/clients.controller';

const router = Router();

router.get('/health', healthCheck);
export default router;