import { Router } from 'express';
import { addProfile, deleteProfile, getProfile, updateProfile } from '@/controllers/profile.controller';

const router = Router();

router.post('/add', addProfile);
router.get('/get', getProfile);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);

export default router;