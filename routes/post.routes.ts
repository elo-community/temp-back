import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { PostController } from '../controllers/post.controller';
import { PostLikeController } from '../controllers/postLike.controller';
import { PostMehService } from '../services/postMeh.service';

const router = Router();
const postController = new PostController();
const postLikeController = new PostLikeController();
const commentController = new CommentController();
const postMehService = new PostMehService();

// Post routes
router.post('/', (req, res) => { void postController.create(req, res); });
router.get('/', (req, res) => { void postController.findAll(req, res); });
router.get('/visible', (req, res) => { void postController.findVisiblePosts(req, res); });
router.get('/author/:authorId', (req, res) => { void postController.findByAuthor(req, res); });
router.get('/category/:categoryId', (req, res) => { void postController.findBySportCategory(req, res); });
router.get('/type/:type', (req, res) => { void postController.findByType(req, res); });
router.get('/:id', (req, res) => { void postController.findOne(req, res); });
router.put('/:id', (req, res) => { void postController.update(req, res); });
router.post('/:id/exposure', (req, res) => { void postController.updateExposure(req, res); });
router.delete('/:id', (req, res) => { void postController.remove(req, res); });

// PostLike routes
router.get('/:postId/likes', (req, res) => { void postLikeController.findByPost(req, res); });
router.get('/:postId/likes/count', (req, res) => { void postLikeController.getLikeCount(req, res); });
router.post('/:postId/likes', (req, res) => { void postLikeController.toggleLike(req, res); });

// PostMeh routes
router.get('/:postId/mehs', (req, res) => { void postController.getPostMehs(req, res); });
router.get('/:postId/mehs/count', (req, res) => { void postController.getPostMehCount(req, res); });
router.post('/:postId/mehs', (req, res) => { void postController.togglePostMeh(req, res); });

// Comment routes (nested under posts)
router.get('/:postId/comments', (req, res) => { void commentController.getByPostId(req, res); });
router.post('/:postId/comments', (req, res) => { void commentController.create(req, res); });
router.put('/:postId/comments/:id', (req, res) => { void commentController.update(req, res); });
router.delete('/:postId/comments/:id', (req, res) => { void commentController.delete(req, res); });

export default router; 