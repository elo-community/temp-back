import { Request, Response } from "express";
import { CommentLikeDto, CommentLikeResponseDto } from "../dtos/commentLike.dto";
import { CommentLikeService } from "../services/commentLike.service";

export class CommentLikeController {
    private commentLikeService = new CommentLikeService();

    // CommentLike 엔티티를 DTO로 변환하는 헬퍼 메서드
    private toCommentLikeDto(commentLike: any): CommentLikeDto {
        return {
            id: commentLike.id,
            commentId: commentLike.comment.id,
            userId: commentLike.user.id,
            isLiked: commentLike.isLiked
        };
    }

    async toggleLike(req: Request, res: Response) {
        try {
            const commentId = parseInt(req.params.commentId);

            // 임시로 Player1의 ID를 사용 (나중에 auth 구현 시 실제 사용자 ID로 변경)
            const userId = 1;

            const commentLike = await this.commentLikeService.toggleLike(commentId, userId);

            const response: CommentLikeResponseDto = {
                success: true,
                data: this.toCommentLikeDto(commentLike),
                message: commentLike.isLiked ? "Comment liked successfully" : "Comment unliked successfully"
            };
            res.json(response);
        } catch (error) {
            console.error("Error in toggleLike controller:", error);

            const response: CommentLikeResponseDto = {
                success: false,
                error: "Failed to toggle comment like"
            };
            res.status(500).json(response);
        }
    }

    async getLikesByComment(req: Request, res: Response) {
        try {
            const commentId = parseInt(req.params.commentId);
            const likes = await this.commentLikeService.findByCommentId(commentId);

            const response: CommentLikeResponseDto = {
                success: true,
                data: likes.map(like => this.toCommentLikeDto(like)),
                message: "Comment likes retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            console.error("Error in getLikesByComment:", error);
            const response: CommentLikeResponseDto = {
                success: false,
                error: "Failed to fetch comment likes"
            };
            res.status(500).json(response);
        }
    }
} 