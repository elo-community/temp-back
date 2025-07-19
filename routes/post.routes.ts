import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { PostController } from '../controllers/post.controller';

const router = Router();
const postController = new PostController();
const commentController = new CommentController();

// Post routes
router.post('/', (req, res) => { void postController.create(req, res); });
router.get('/', (req, res) => { void postController.findAll(req, res); });
router.get('/:id', (req, res) => { void postController.findOne(req, res); });
router.put('/:id', (req, res) => { void postController.update(req, res); });
router.delete('/:id', (req, res) => { void postController.remove(req, res); });

// Comment routes (nested under posts)
router.get('/:postId/comments', (req, res) => { void commentController.getByPostId(req, res); });
router.post('/:postId/comments', (req, res) => { void commentController.create(req, res); });
router.put('/:postId/comments/:id', (req, res) => { void commentController.update(req, res); });
router.delete('/:postId/comments/:id', (req, res) => { void commentController.delete(req, res); });

export default router; 