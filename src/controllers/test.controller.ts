import { Request, Response } from 'express';
import { createTest, deleteTestById, fetchTestById, fetchTestsByCourseId, fetchTestsByLessonId, fetchTestsByUnitId, updateTestById, } from '@/services/test.service';

export const addTest = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const unit = await createTest(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getTestByLessonId = async (req: Request, res: Response) => {
    const { lesson_id } = req.params;
    try {
        const course = await fetchTestsByLessonId(lesson_id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getTestByUnitId = async (req: Request, res: Response) => {
    const { unit_id } = req.params;
    try {
        const course = await fetchTestsByUnitId(unit_id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getTestByCourseId = async (req: Request, res: Response) => {
    const { course_id } = req.params;
    try {
        const course = await fetchTestsByCourseId(course_id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getTestById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const course = await fetchTestById(id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateTest = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const course = await updateTestById(id, title);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteTest = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteTestById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}