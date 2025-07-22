import { Router } from 'express';
import { health, login, me, validate } from '../controllers/auth.controller';
import { catchAsync } from '@legal/shared-utils';

const router = Router();

router.get('/health', health);                 // סינכרוני
router.post('/login', catchAsync(login));      // אסינכרוני
router.get('/me', catchAsync(me));             // אסינכרוני
router.get('/validate', catchAsync(validate)); // אסינכרוני

export default router;
