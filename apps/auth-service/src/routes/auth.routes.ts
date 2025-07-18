import { Router } from 'express';
import { healthCheck, login, getMe, validateToken } from '../controllers/auth.controller';

const router = Router();

router.get('/health', healthCheck);
router.post('/login', login);
router.get('/me', getMe);
router.get('/validate', validateToken);

export default router;