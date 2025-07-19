import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { CommentLikeController } from "../controllers/commentLike.controller";

const router = Router();
const controller = new CommentController();
const commentLikeController = new CommentLikeController();

router.get("/", (req, res) => { void controller.getAll(req, res); });
router.get("/:id", (req, res) => { void controller.getById(req, res); });
router.get("/post/:postId", (req, res) => { void controller.getByPostId(req, res); });
router.post("/", (req, res) => { void controller.create(req, res); });
router.put("/:id", (req, res) => { void controller.update(req, res); });
router.delete("/:id", (req, res) => { void controller.delete(req, res); });


router.post('/:commentId/likes', (req, res) => { void commentLikeController.toggleLike(req, res); });
router.get('/:commentId/likes', (req, res) => { void commentLikeController.getLikesByComment(req, res); });

export default router; 