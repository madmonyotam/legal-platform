import { Router } from 'express';
import { getCases, healthCheck } from '../controllers/case.controller';
import { catchAsync } from '@legal/shared-utils';

const router = Router();

router.get('/', catchAsync(getCases));
router.get('/health', healthCheck);

export default router;
