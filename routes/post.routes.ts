import { Router } from 'express';
import { PostController } from '../controllers/post.controller';

const router = Router();
const controller = new PostController();

router.post('/', (req, res) => { void controller.create(req, res); });
router.get('/', (req, res) => { void controller.findAll(req, res); });
router.get('/:id', (req, res) => { void controller.findOne(req, res); });
router.put('/:id', (req, res) => { void controller.update(req, res); });
router.delete('/:id', (req, res) => { void controller.remove(req, res); });

export default router; 