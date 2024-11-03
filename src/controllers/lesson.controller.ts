import { Request, Response } from 'express';
import { createLesson, deleteLessonById, fetchLessonById, fetchLessonsPaginated, updateLessonById, } from '@/services/lesson.service';

export async function addLesson(req: Request, res: Response) {
  const { title } = req.body;
  try {
    const unit = await createLesson(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getLessons(req: Request, res: Response) {
  const { start, limit } = req.query;
  try {
    const Lessons = await fetchLessonsPaginated(Number(start), Number(limit));
    res.status(200).json(Lessons);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getLessonById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const Lesson = await fetchLessonById(id);
        res.status(200).json(Lesson);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateLesson(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const Lesson = await updateLessonById(id, title);
        res.status(200).json(Lesson);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteLesson(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await deleteLessonById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}