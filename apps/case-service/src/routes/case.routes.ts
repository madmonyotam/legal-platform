import { Router } from 'express';
import { getCases } from '../controllers/case.controller';
import { catchAsync } from '@legal/shared-utils';

const router = Router();

router.get('/', catchAsync(getCases));

export default router;
