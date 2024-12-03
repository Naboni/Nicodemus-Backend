import { Router } from 'express';
import { registerUser } from '@/controllers/user.controller';
import { addLesson, addLessonToUser, deleteLesson, getLessonById, getLessons, proceedToNextStepInLesson, updateLesson } from '@/controllers/lesson.controller';
import { getCourseById, getCourses } from '@/controllers/course.controller';

const router = Router();

router.post('/create', addLesson);
router.get('/get', getLessons);
router.get('/get/:id', getLessonById);
router.put('/update/:id', updateLesson);
router.delete('/delete/:id', deleteLesson);

router.post('/addLessonToUser', addLessonToUser);
router.post('/proceedToNextStep', proceedToNextStepInLesson);

export default router;