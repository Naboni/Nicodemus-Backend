import { Request, Response } from 'express';
import { createCourse, createUserCourse, deleteCourseById, fetchCourseById, fetchCoursesPaginated, updateCourseById, } from '@/services/course.service';

export const addCourse = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const unit = await createCourse(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getCourses = async (req: Request, res: Response) => {
  const { start, limit } = req.query;
  try {
    const courses = await fetchCoursesPaginated(Number(start), Number(limit));
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const course = await fetchCourseById(id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const course = await updateCourseById(id, title);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteCourseById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

// many to many relationship with user

export const addCourseToUser = async (req: Request, res: Response) => {
  const { courseId, userId } = req.body;
  try {
    const course = await createUserCourse(courseId, userId);
    res.status(201).json(course);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}