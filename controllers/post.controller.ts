import { Request, Response } from 'express';
import { PostResponseDto } from '../dtos/post.dto';
import { PostMehResponseDto } from '../dtos/postMeh.dto';
import { SportCategory } from '../entities/SportCategory';
import { PostService } from '../services/post.service';
import { PostMehService } from '../services/postMeh.service';
import { SportCategoryService } from '../services/sportCategory.service';

const postService = new PostService();
const sportCategoryService = new SportCategoryService();
const postMehService = new PostMehService();

export class PostController {
    async create(req: Request, res: Response) {
        try {
            const {
                content,
                title,
                type,
                sportCategoryId,
                authorId
            } = req.body;

            // Validate required fields
            let sportCategory: SportCategory | null;
            if (!sportCategoryId) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Sport category is required"
                };
                return res.status(400).json(response);
            } else {
                sportCategory = await sportCategoryService.findById(sportCategoryId);
                if (!sportCategory) {
                    const response: PostResponseDto = {
                        status: "error",
                        error: "Sport category not found"
                    };
                    return res.status(400).json(response);
                }
            }


            const post = await postService.create({
                content,
                title,
                type,
                author: authorId || 1, // Default to user 1 if not provided
                sportCategory: sportCategory || undefined
            });

            const response: PostResponseDto = {
                status: "success",
                data: post,
                message: "Post created successfully"
            };
            res.status(201).json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to create post"
            };
            res.status(500).json(response);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const posts = await postService.findAll();
            const response: PostResponseDto = {
                status: "success",
                data: posts,
                message: "Posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to fetch posts"
            };
            res.status(500).json(response);
        }
    }

    async findVisiblePosts(req: Request, res: Response) {
        try {
            const posts = await postService.findVisiblePosts();
            const response: PostResponseDto = {
                status: "success",
                data: posts,
                message: "Visible posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to fetch visible posts"
            };
            res.status(500).json(response);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const post = await postService.findById(id);
            if (!post) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                status: "success",
                data: post,
                message: "Post retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to fetch post"
            };
            res.status(500).json(response);
        }
    }

    async findByAuthor(req: Request, res: Response) {
        try {
            const authorId = parseInt(req.params.authorId, 10);
            if (isNaN(authorId)) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Invalid author id"
                };
                return res.status(400).json(response);
            }

            const posts = await postService.findByAuthor(authorId);
            const response: PostResponseDto = {
                status: "success",
                data: posts,
                message: "Posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to fetch posts by author"
            };
            res.status(500).json(response);
        }
    }

    async findBySportCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);
            if (isNaN(categoryId)) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Invalid category id"
                };
                return res.status(400).json(response);
            }

            const posts = await postService.findBySportCategory(categoryId);
            const response: PostResponseDto = {
                status: "success",
                data: posts,
                message: "Posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to fetch posts by category"
            };
            res.status(500).json(response);
        }
    }

    async findByType(req: Request, res: Response) {
        try {
            const { type } = req.params;
            const posts = await postService.findByType(type);
            const response: PostResponseDto = {
                status: "success",
                data: posts,
                message: "Posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to fetch posts by type"
            };
            res.status(500).json(response);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const post = await postService.update(id, req.body);
            if (!post) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                status: "success",
                data: post,
                message: "Post updated successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to update post"
            };
            res.status(500).json(response);
        }
    }

    async updateExposure(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const post = await postService.updateExposure(id, req.body.isHidden);
            if (!post) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                status: "success",
                data: post,
                message: "Post exposure updated successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: error instanceof Error ? error.message : "Failed to hide post"
            };
            res.status(500).json(response);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const deleted = await postService.remove(id);
            if (!deleted) {
                const response: PostResponseDto = {
                    status: "error",
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                status: "success",
                message: "Post deleted successfully"
            };
            res.status(200).json(response);
        } catch (error) {
            const response: PostResponseDto = {
                status: "error",
                error: "Failed to delete post"
            };
            res.status(500).json(response);
        }
    }

    async togglePostMeh(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = 1; // TODO: get user id from token

            if (isNaN(postId)) {
                const response: PostMehResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            if (!userId) {
                const response: PostMehResponseDto = {
                    status: "error",
                    error: "User ID is required"
                };
                return res.status(400).json(response);
            }

            const postMeh = await postMehService.toggleMeh(postId, userId);
            const response: PostMehResponseDto = {
                status: "success",
                data: postMeh,
                message: "Post meh toggled successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostMehResponseDto = {
                status: "error",
                error: "Failed to toggle post meh"
            };
            res.status(500).json(response);
        }
    }

    async getPostMehs(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);

            if (isNaN(postId)) {
                const response: PostMehResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const postMehs = await postMehService.findByPost(postId);
            const response: PostMehResponseDto = {
                status: "success",
                data: postMehs,
                message: "Post mehs retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostMehResponseDto = {
                status: "error",
                error: "Failed to fetch post mehs"
            };
            res.status(500).json(response);
        }
    }

    async getPostMehCount(req: Request, res: Response) {
        try {
            const postId = parseInt(req.params.postId, 10);

            if (isNaN(postId)) {
                const response: PostMehResponseDto = {
                    status: "error",
                    error: "Invalid post id"
                };
                return res.status(400).json(response);
            }

            const count = await postMehService.getMehCount(postId);
            const response: PostMehResponseDto = {
                status: "success",
                data: { count },
                message: "Post meh count retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostMehResponseDto = {
                status: "error",
                error: "Failed to get post meh count"
            };
            res.status(500).json(response);
        }
    }
} 