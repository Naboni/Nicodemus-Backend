import { Request, Response } from 'express';
import { createUnit } from '@/services/unit.service';

export async function addUnit(req: Request, res: Response) {
  const { title, course_id } = req.body;
  try {
    const unit = await createUnit(title, course_id);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}