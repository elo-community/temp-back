import { Router } from 'express';
import * as matchController from '../controllers/match.controller';

const router = Router();

router.post('/', matchController.createMatch);
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.post('/:id/accept', matchController.acceptMatch);
router.post('/:id/reject', matchController.rejectMatch);
router.post('/:id/result', matchController.setMatchResult);
router.get('/:id/history', matchController.getMatchHistory);

export default router; 