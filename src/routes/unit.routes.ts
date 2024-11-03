import { Router } from 'express';
import { addUnit } from '@/controllers/unit.controller';

const router = Router();

router.post('/add', addUnit);

export default router;