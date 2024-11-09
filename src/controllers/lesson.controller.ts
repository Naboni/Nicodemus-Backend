import { Request, Response } from 'express';
import { createLesson, createUserLesson, deleteLessonById, fetchLessonById, fetchLessonsPaginated, updateLessonById, } from '@/services/lesson.service';

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