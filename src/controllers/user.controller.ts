import { Request, Response } from 'express';
import { authLogin, authRegister } from '@/services/user.service';
import { createUserProfile } from '@/services/profile.service';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, user_name } = req.body;
  try {
    // Insert a new user to supabase auth
    const user = await authRegister(email, password);
    if (!user.user) {
      throw new Error("Failed to create user");
    }
    // Insert a new user to Profile table
    console.log({user})
    await createUserProfile({user_id: user.user.id, user_name});
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authLogin(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}