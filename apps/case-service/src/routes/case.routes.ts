import { Router } from 'express';
import { getCases } from '../controllers/case.controller';

const router = Router();

router.get('/', getCases);

export default router;