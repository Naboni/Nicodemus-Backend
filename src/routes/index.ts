import { Router } from 'express';
import userRoutes from '@/routes/user.routes';
import courseRoutes from '@/routes/course.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/course', courseRoutes);

export default router;