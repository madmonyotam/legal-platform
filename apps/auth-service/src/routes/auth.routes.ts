import { Router } from 'express';
import { catchAsync } from '@legal/shared-utils';
import { health, login, me, validate } from '../controllers/auth.controller';
import { register } from '../controllers/register.controller';

const router = Router();

router.get('/health', health);                 // סינכרוני
router.post('/login', catchAsync(login));      // אסינכרוני
router.get('/me', catchAsync(me));
router.get('/validate', catchAsync(validate));
router.post('/register', catchAsync(register));

export default router;
