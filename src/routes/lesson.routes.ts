import { Router } from 'express';
import { registerUser } from '@/controllers/user.controller';
import { addLesson, deleteLesson, getLessonById, getLessons, updateLesson } from '@/controllers/lesson.controller';
import { getCourseById, getCourses } from '@/controllers/course.controller';

const router = Router();

router.post('/add', addLesson);
router.get('/get', getLessons);
router.get('/get/:id', getLessonById);
router.put('/update/:id', updateLesson);
router.delete('/delete/:id', deleteLesson);

export default router;