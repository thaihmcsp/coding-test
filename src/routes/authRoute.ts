import {Router} from 'express';
import { createUser, getMe, signIn } from '../controllers/authController';
import { checkToken } from '../middleWare/auth';
import { createUserValidate, signInValidate } from '../middleWare/validator/authValidate';
const router = Router();

router.post('/create-user', createUserValidate, createUser);
router.post('/sign-in', signInValidate, signIn);
router.get('/me', checkToken, getMe);

export default router;