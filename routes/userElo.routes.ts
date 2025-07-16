import { Router } from 'express';
import * as ctrl from '../controllers/userElo.controller';

const router = Router();
router.post('/', ctrl.createUserElo);
router.get('/', ctrl.getAllUserElo);
router.get('/:id', ctrl.getUserEloById);
router.put('/:id', ctrl.updateUserElo);
router.delete('/:id', ctrl.deleteUserElo);

export default router; 