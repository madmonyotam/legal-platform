import { Router } from 'express';
import { getCases, healthCheck } from '../controllers/case.controller';

const router = Router();

router.get('/', getCases);
router.get('/health', healthCheck);

export default router;