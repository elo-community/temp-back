import { Router } from 'express';
import * as ctrl from '../controllers/commentLike.controller';

const router = Router();
router.post('/', ctrl.createCommentLike);
router.get('/', ctrl.getAllCommentLike);
router.get('/:id', ctrl.getCommentLikeById);
router.put('/:id', ctrl.updateCommentLike);
router.delete('/:id', ctrl.deleteCommentLike);

export default router; 