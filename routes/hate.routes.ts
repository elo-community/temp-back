import { Router } from 'express';
import * as ctrl from '../controllers/hate.controller';

const router = Router();
router.post('/', ctrl.createHate);
router.get('/', ctrl.getAllHate);
router.get('/:id', ctrl.getHateById);
router.put('/:id', ctrl.updateHate);
router.delete('/:id', ctrl.deleteHate);

export default router; 