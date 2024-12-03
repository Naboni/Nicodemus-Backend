import { Request, Response } from 'express';
import { createLesson, createUserLesson, deleteLessonById, fetchLessonById, fetchLessonsPaginated, moveToNextStepInLesson, updateLessonById, } from '@/services/lesson.service';
import { checkIfTestAnswerIsCorrect, fetchTestsByLessonId } from '@/services/test.service';
import { addXP, createTestProfile, fetchTestsAlreadyTaken } from '@/services/profile.service';
import supabase from '@/config/supabaseClient';

export const addLesson = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const unit = await createLesson(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getLessons = async (req: Request, res: Response) => {
  const { start, limit } = req.query;
  try {
    const Lessons = await fetchLessonsPaginated(Number(start), Number(limit));
    res.status(200).json(Lessons);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getLessonById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const Lesson = await fetchLessonById(id);
        res.status(200).json(Lesson);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateLesson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const Lesson = await updateLessonById(id, title);
        res.status(200).json(Lesson);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteLesson = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteLessonById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

// many to many relationship with user

export const addLessonToUser = async (req: Request, res: Response) => {
  const { lessonId, userId } = req.body;
  try {
    const lesson = await createUserLesson(lessonId, userId);
    res.status(201).json(lesson);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const proceedToNextStepInLesson = async (req: Request, res: Response) => {
  const { lessonId, userId, step, prevTestId, answer } = req.body;
  try {

    const userLesson = await moveToNextStepInLesson(lessonId, userId, step);
    const lessonTests = await fetchTestsByLessonId(lessonId);
    
    // fetch already taken tests
    const takenTests = await fetchTestsAlreadyTaken(userId);

    // filter out tests that the user has already taken
    const takenTestIds = takenTests.map((test) => test.test_id);
    const availableTests = lessonTests.filter((test) => !takenTestIds.includes(test.id));

    if (availableTests.length === 0) {
      res.status(400).json({ error: 'No more tests available for this lesson.' });
    }
    
    const randomTest = availableTests[Math.floor(Math.random() * availableTests.length)];
    const testWithoutAnswer = { ...randomTest, answer: "" };

    // Assign the new test to the user
    const testTakenByUser = createTestProfile(userId, randomTest.id);
    
    let correctAnswer = null;
    if (prevTestId) {
      correctAnswer = await checkIfTestAnswerIsCorrect(prevTestId, answer);
    }

    if (correctAnswer) {
      await addXP(userId, 5 * step);
    }
  
    res.status(201).json({ message: "Lesson step updated", userLesson, testWithoutAnswer, correctAnswer, addedXP: correctAnswer ? 5 * step : 0 });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}