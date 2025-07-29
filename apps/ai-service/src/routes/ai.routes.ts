import { Router } from 'express';
import { catchAsync } from '@legal/shared-utils';
import { healthCheck, getAiInfo } from '../controllers/ai.controller';

const router = Router();

router.get('/health', healthCheck);                    // סינכרוני
router.get('/', catchAsync(getAiInfo));               // אסינכרוני

export default router;