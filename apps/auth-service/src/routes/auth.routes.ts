import { Router } from 'express';
import { catchAsync, enforceInternalAccess } from '@legal/shared-utils';
import { health, validate } from '../controllers/auth.controller';
import { register } from '../controllers/register.controller';
import { login } from '../controllers/login.controller';
import { invite } from '../controllers/invite.controller';

const router = Router();

router.get('/health', health);                 // סינכרוני
router.post('/login', catchAsync(login));      // אסינכרוני
//router.get('/validate', catchAsync(validate));
router.post('/validate', catchAsync(validate));
router.post('/register', catchAsync(register));

router.post('/invite', enforceInternalAccess, catchAsync(invite));

export default router;
