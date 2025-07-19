import { Request, Response } from "express";
import { CommentDto, CommentResponseDto } from "../dtos/comment.dto";
import { CommentService } from "../services/comment.service";

export class CommentController {
    private commentService = new CommentService();

    // Comment 엔티티를 DTO로 변환하는 헬퍼 메서드
    private toCommentDto(comment: any): CommentDto {
        return {
            id: comment.id,
            userId: comment.user.id,
            postId: comment.post.id,
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt
        };
    }

    async getAll(req: Request, res: Response) {
        try {
            const comments = await this.commentService.findAll();
            const response: CommentResponseDto = {
                success: true,
                data: comments.map(comment => this.toCommentDto(comment)),
                message: "Comments retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: CommentResponseDto = {
                success: false,
                error: "Failed to fetch comments"
            };
            res.status(500).json(response);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const comment = await this.commentService.findById(id);

            if (!comment) {
                const response: CommentResponseDto = {
                    success: false,
                    error: "Comment not found"
                };
                return res.status(404).json(response);
            }

            const response: CommentResponseDto = {
                success: true,
                data: this.toCommentDto(comment),
                message: "Comment retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: CommentResponseDto = {
                success: false,
                error: "Failed to fetch comment"
            };
            res.status(500).json(response);
        }
    }

    async getByPostId(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId);
            const comments = await this.commentService.findByPostId(postId);

            const response: CommentResponseDto = {
                success: true,
                data: comments.map(comment => this.toCommentDto(comment)),
                message: "Comments for post retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: CommentResponseDto = {
                success: false,
                error: "Failed to fetch comments for post"
            };
            res.status(500).json(response);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId);

            // 임시로 Player1의 ID를 사용 (나중에 auth 구현 시 실제 사용자 ID로 변경)
            const commentData = {
                ...req.body,
                user: { id: 1 }, // Player1의 ID
                post: { id: postId } // URL에서 가져온 postId
            };

            const comment = await this.commentService.create(commentData);
            const response: CommentResponseDto = {
                success: true,
                data: this.toCommentDto(comment),
                message: "Comment created successfully"
            };
            res.status(201).json(response);
        } catch (error) {
            const response: CommentResponseDto = {
                success: false,
                error: "Failed to create comment"
            };
            res.status(500).json(response);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const comment = await this.commentService.update(id, req.body);

            if (!comment) {
                const response: CommentResponseDto = {
                    success: false,
                    error: "Comment not found"
                };
                return res.status(404).json(response);
            }

            const response: CommentResponseDto = {
                success: true,
                data: this.toCommentDto(comment),
                message: "Comment updated successfully"
            };
            res.json(response);
        } catch (error) {
            const response: CommentResponseDto = {
                success: false,
                error: "Failed to update comment"
            };
            res.status(500).json(response);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const success = await this.commentService.delete(id);

            if (!success) {
                const response: CommentResponseDto = {
                    success: false,
                    error: "Comment not found"
                };
                return res.status(404).json(response);
            }

            const response: CommentResponseDto = {
                success: true,
                message: "Comment deleted successfully"
            };
            res.status(200).json(response);
        } catch (error) {
            const response: CommentResponseDto = {
                success: false,
                error: "Failed to delete comment"
            };
            res.status(500).json(response);
        }
    }
} 