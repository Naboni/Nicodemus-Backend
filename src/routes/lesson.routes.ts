import { Router } from 'express';
import { registerUser } from '@/controllers/user.controller';

const router = Router();

router.post('/add', registerUser);

export default router;