import { Router } from 'express';
import { PostLikeController } from '../controllers/postLike.controller';

const router = Router();
const postLikeController = new PostLikeController();

// PostLike routes
router.post('/', (req, res) => { void postLikeController.create(req, res); });
router.get('/', (req, res) => { void postLikeController.findAll(req, res); });
router.get('/:id', (req, res) => { void postLikeController.findById(req, res); });

// Post-specific routes
router.get('/posts/:postId', (req, res) => { void postLikeController.findByPost(req, res); });
router.get('/posts/:postId/liked', (req, res) => { void postLikeController.findLikedByPost(req, res); });
router.get('/posts/:postId/count', (req, res) => { void postLikeController.getLikeCount(req, res); });

// User-specific routes
router.get('/users/:userId', (req, res) => { void postLikeController.findByUser(req, res); });
// Update and delete routes
router.put('/:id', (req, res) => { void postLikeController.update(req, res); });
router.delete('/:id', (req, res) => { void postLikeController.remove(req, res); });

export default router; 