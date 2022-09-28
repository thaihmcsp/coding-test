import {Router} from 'express';
import authRoute from '../routes/authRoute.js';
import bookRoute from '../routes/bookRoute.js';
import categoryRoute from '../routes/categoryRoute.js';
import userRoute from '../routes/userRoute.js';
const router = Router();

router.use('/api/auth', authRoute);
router.use('/api/user', userRoute);
router.use('/api/book', bookRoute);
router.use('/api/category', categoryRoute);

export default router