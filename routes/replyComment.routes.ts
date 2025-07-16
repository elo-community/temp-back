import { Router } from 'express';
import * as ctrl from '../controllers/replyComment.controller';

const router = Router();
router.post('/', ctrl.createReplyComment);
router.get('/', ctrl.getAllReplyComment);
router.get('/:id', ctrl.getReplyCommentById);
router.put('/:id', ctrl.updateReplyComment);
router.delete('/:id', ctrl.deleteReplyComment);

export default router; 