import { Request, Response } from 'express';
import { createUnit, createUserUnit, deleteUnitById, fetchUnitById, fetchUnitsPaginated, updateUnitById, } from '@/services/unit.service';

export const addUnit = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const unit = await createUnit(title);
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getUnits = async (req: Request, res: Response) => {
  const { start, limit } = req.query;
  try {
    const courses = await fetchUnitsPaginated(Number(start), Number(limit));
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getUnitById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const course = await fetchUnitById(id);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateUnit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const course = await updateUnitById(id, title);
        res.status(200).json(course);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteUnit = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteUnitById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

// many to many relationship with user

export const addUnitToUser = async (req: Request, res: Response) => {
  const { unitId, userId } = req.body;
  try {
    const course = await createUserUnit(unitId, userId);
    res.status(201).json(course);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}