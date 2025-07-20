import { Request, Response } from 'express';
import { PostLikeResponseDto } from '../dtos/postLike.dto';
import { PostLikeService } from '../services/postLike.service';

const postLikeService = new PostLikeService();

export class PostLikeController {
    async create(req: Request, res: Response) {
        try {
            const { postId, userId, isLiked = true } = req.body;

            if (!postId || !userId) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post ID and User ID are required"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.create({
                post: postId,
                user: userId,
                isLiked
            });

            const response: PostLikeResponseDto = {
                success: true,
                data: postLike,
                message: "Post like created successfully"
            };
            res.status(201).json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to create post like"
            };
            res.status(500).json(response);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const postLikes = await postLikeService.findAll();
            const response: PostLikeResponseDto = {
                success: true,
                data: postLikes,
                message: "Post likes retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to fetch post likes"
            };
            res.status(500).json(response);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post like id"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.findById(id);
            if (!postLike) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post like not found"
                };
                return res.status(404).json(response);
            }

            const response: PostLikeResponseDto = {
                success: true,
                data: postLike,
                message: "Post like retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to fetch post like"
            };
            res.status(500).json(response);
        }
    }

    async findByPost(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            if (isNaN(postId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const postLikes = await postLikeService.findByPost(postId);
            const response: PostLikeResponseDto = {
                success: true,
                data: postLikes,
                message: "Post likes retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to fetch post likes"
            };
            res.status(500).json(response);
        }
    }

    async findByUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid user id"
                };
                return res.status(400).json(response);
            }

            const postLikes = await postLikeService.findByUser(userId);
            const response: PostLikeResponseDto = {
                success: true,
                data: postLikes,
                message: "Post likes retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to fetch post likes"
            };
            res.status(500).json(response);
        }
    }

    async findByPostAndUser(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(postId) || isNaN(userId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id or user id"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.findByPostAndUser(postId, userId);
            if (!postLike) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post like not found"
                };
                return res.status(404).json(response);
            }

            const response: PostLikeResponseDto = {
                success: true,
                data: postLike,
                message: "Post like retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to fetch post like"
            };
            res.status(500).json(response);
        }
    }

    async findLikedByPost(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            if (isNaN(postId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const postLikes = await postLikeService.findLikedByPost(postId);
            const response: PostLikeResponseDto = {
                success: true,
                data: postLikes,
                message: "Liked posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to fetch liked posts"
            };
            res.status(500).json(response);
        }
    }

    async toggleLike(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = 1; // TODO: get user id from token

            if (isNaN(postId) || isNaN(userId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id or user id"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.toggleLike(postId, userId);
            const response: PostLikeResponseDto = {
                success: true,
                data: postLike,
                message: "Post like toggled successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to toggle post like"
            };
            res.status(500).json(response);
        }
    }

    async likePost(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(postId) || isNaN(userId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id or user id"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.likePost(postId, userId);
            const response: PostLikeResponseDto = {
                success: true,
                data: postLike,
                message: "Post liked successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to like post"
            };
            res.status(500).json(response);
        }
    }

    async unlikePost(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(postId) || isNaN(userId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id or user id"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.unlikePost(postId, userId);
            if (!postLike) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post like not found"
                };
                return res.status(404).json(response);
            }

            const response: PostLikeResponseDto = {
                success: true,
                data: postLike as any,
                message: "Post unliked successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to unlike post"
            };
            res.status(500).json(response);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post like id"
                };
                return res.status(400).json(response);
            }

            const postLike = await postLikeService.update(id, req.body);
            if (!postLike) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post like not found"
                };
                return res.status(404).json(response);
            }

            const response: PostLikeResponseDto = {
                success: true,
                data: postLike,
                message: "Post like updated successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to update post like"
            };
            res.status(500).json(response);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post like id"
                };
                return res.status(400).json(response);
            }

            const deleted = await postLikeService.remove(id);
            if (!deleted) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post like not found"
                };
                return res.status(404).json(response);
            }

            const response: PostLikeResponseDto = {
                success: true,
                message: "Post like deleted successfully"
            };
            res.status(200).json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to delete post like"
            };
            res.status(500).json(response);
        }
    }

    async removeByPostAndUser(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(postId) || isNaN(userId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id or user id"
                };
                return res.status(400).json(response);
            }

            const deleted = await postLikeService.removeByPostAndUser(postId, userId);
            if (!deleted) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Post like not found"
                };
                return res.status(404).json(response);
            }

            const response: PostLikeResponseDto = {
                success: true,
                message: "Post like deleted successfully"
            };
            res.status(200).json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to delete post like"
            };
            res.status(500).json(response);
        }
    }

    async getLikeCount(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            if (isNaN(postId)) {
                const response: PostLikeResponseDto = {
                    success: false,
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const count = await postLikeService.getLikeCount(postId);
            const response: PostLikeResponseDto = {
                success: true,
                data: { count },
                message: "Like count retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostLikeResponseDto = {
                success: false,
                error: "Failed to get like count"
            };
            res.status(500).json(response);
        }
    }
} 