import { Router } from 'express';
import { catchAsync } from '@legal/shared-utils';
import { getAiInfo } from '../controllers/ai.controller';

const router = Router();

router.get('/', catchAsync(getAiInfo));               // אסינכרוני

export default router;