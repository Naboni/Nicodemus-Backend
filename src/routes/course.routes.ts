import { Router } from 'express';
import { addCourse, addCourseToUser, deleteCourse, getCourseById, getCourses, updateCourse } from '@/controllers/course.controller';

const router = Router();

router.post('/add', addCourse);
router.get('/get', getCourses);
router.get('/get/:id', getCourseById);
router.put('/update/:id', updateCourse);
router.delete('/delete/:id', deleteCourse);

router.post('/addCourseToUser', addCourseToUser);

export default router;