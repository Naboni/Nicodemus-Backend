import { Router } from 'express';
import { addUnit, addUnitToUser, deleteUnit, getUnitById, getUnits, updateUnit } from '@/controllers/unit.controller';

const router = Router();

router.post('/add', addUnit);
router.get('/get', getUnits);
router.get('/get/:id', getUnitById);
router.put('/update/:id', updateUnit);
router.delete('/delete/:id', deleteUnit);

router.post('/addUnitToUser', addUnitToUser);

export default router;