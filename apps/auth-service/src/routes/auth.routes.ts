import { Router } from 'express';
import { health, login, me, validate } from '../controllers/auth.controller';

const router = Router();

router.get('/health', health);
router.post('/login', login);
router.get('/me', me);
router.get('/validate', validate);

export default router;