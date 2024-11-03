import { Request, Response } from 'express';
import { createUnit, deleteUnitById, fetchUnitById, fetchUnitsPaginated, updateUnitById, } from '@/services/unit.service';

export async function addUnit(req: Request, res: Response) {
  const { title } = req.body;
  try {
    const unit = await createUnit(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUnits(req: Request, res: Response) {
  const { start, limit } = req.query;
  try {
    const courses = await fetchUnitsPaginated(Number(start), Number(limit));
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUnitById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const course = await fetchUnitById(id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateUnit(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const course = await updateUnitById(id, title);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteUnit(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await deleteUnitById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}