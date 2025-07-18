import { Router } from 'express';
import { getCases } from '../controllers/case.controller.ts';

const router = Router();

router.get('/', getCases);

export default router;