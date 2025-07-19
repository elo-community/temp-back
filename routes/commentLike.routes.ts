import { Router } from "express";
import { CommentLikeController } from "../controllers/commentLike.controller";

const router = Router();
const controller = new CommentLikeController();

// POST /api/v1/comments/:commentId/likes - 댓글 좋아요 토글
router.post("/:commentId/likes", (req, res) => { void controller.toggleLike(req, res); });

// GET /api/v1/comments/:commentId/likes - 댓글 좋아요 목록 조회
router.get("/:commentId/likes", (req, res) => { void controller.getLikesByComment(req, res); });

export default router; 