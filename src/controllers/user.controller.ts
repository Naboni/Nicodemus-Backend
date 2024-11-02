import { Request, Response } from 'express';
import { createUser } from '@/services/user.service';

export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}