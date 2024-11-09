import { Request, Response } from 'express';
import { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from '@/services/profile.service';

export const addProfile = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const unit = await createUserProfile(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await getUserProfile(id);
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const updateProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const course = await updateUserProfile(id, userData);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteUserProfile(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}