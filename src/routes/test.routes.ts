import { Router } from 'express';
import { addTest, checkAnswer, deleteTest, getTestByCourseId, getTestById, getTestByLessonId, getTestByUnitId, updateTest } from '@/controllers/test.controller';

const router = Router();

router.post('/add', addTest);
router.get('/get/:id', getTestById);
router.get('/get/:lesson_id', getTestByLessonId);
router.get('/get/:unit_id', getTestByUnitId);
router.get('/get/:course_id', getTestByCourseId);
router.put('/update/:id', updateTest);
router.delete('/delete/:id', deleteTest);
router.post('/checkTestAnswer', checkAnswer);

export default router;