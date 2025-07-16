import { Router } from 'express';
import * as ctrl from '../controllers/file.controller';

const router = Router();
router.post('/', ctrl.createFile);
router.get('/', ctrl.getAllFiles);
router.get('/:id', ctrl.getFileById);
router.put('/:id', ctrl.updateFile);
router.delete('/:id', ctrl.deleteFile);

export default router;