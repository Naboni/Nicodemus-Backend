import { Router } from 'express';
import userRoutes from '@/routes/user.routes';
import courseRoutes from '@/routes/course.routes';
import lessonRoutes from '@/routes/lesson.routes';
import unitRoutes from '@/routes/unit.routes';
import testRoutes from '@/routes/test.routes';
import profileRoutes from '@/routes/profile.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/course', courseRoutes);
router.use('/lesson', lessonRoutes);
router.use('/unit', unitRoutes);
router.use('/test', testRoutes);
router.use('/profile', profileRoutes);

export default router;