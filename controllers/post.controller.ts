import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PostDto, PostResponseDto } from '../dtos/post.dto';
import { Post } from '../entities/Post';
import { SportCategory } from '../entities/SportCategory';
import { User } from '../entities/User';

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);
const sportCategoryRepo = AppDataSource.getRepository(SportCategory);

export class PostController {
    async create(req: Request, res: Response) {
        try {
            const {
                content,
                title,
                postType: type,
                matchDate,
                matchLocation,
                matchTime,
                tokenReward,
                validityPeriod: validUntil,
                category: sportCategoryId,
                elo,
                location,
                preferredElo,
            } = req.body;

            // 임시로 Player1의 ID를 사용 (나중에 auth 구현 시 실제 사용자 ID로 변경)
            const authorId = 1;

            // User와 SportCategory 엔티티 조회
            const author = await userRepo.findOne({ where: { id: authorId } });
            const sportCategory = await sportCategoryRepo.findOne({ where: { id: sportCategoryId } });

            if (!author) {
                const response: PostResponseDto = {
                    success: false,
                    error: "Author not found"
                };
                return res.status(404).json(response);
            }

            if (!sportCategory) {
                const response: PostResponseDto = {
                    success: false,
                    error: "Sport category not found"
                };
                return res.status(404).json(response);
            }

            const post = postRepo.create({
                author,
                sportCategory,
                content,
                title,
                type,
                isHidden: false,
                matchDate,
                matchLocation,
                matchTime,
                tokenReward,
                validUntil,
                elo,
                location,
                preferredElo,
            });

            const savedPost = await postRepo.save(post);

            const response: PostResponseDto = {
                success: true,
                data: new PostDto(savedPost),
                message: "Post created successfully"
            };
            res.status(201).json(response);
        } catch (error) {
            const response: PostResponseDto = {
                success: false,
                error: "Failed to create post"
            };
            res.status(500).json(response);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const posts = await postRepo.find({
                relations: ['author', 'sportCategory']
            });
            const response: PostResponseDto = {
                success: true,
                data: posts.map((p: Post) => new PostDto(p)),
                message: "Posts retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                success: false,
                error: "Failed to fetch posts"
            };
            res.status(500).json(response);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const post = await postRepo.findOne({
                where: { id: Number(req.params.id) },
                relations: ['author', 'sportCategory']
            });
            if (!post) {
                const response: PostResponseDto = {
                    success: false,
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                success: true,
                data: new PostDto(post),
                message: "Post retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                success: false,
                error: "Failed to fetch post"
            };
            res.status(500).json(response);
        }
    }

    async update(req: Request, res: Response) {
        try {
            await postRepo.update(Number(req.params.id), req.body);
            const updatedPost = await postRepo.findOne({
                where: { id: Number(req.params.id) },
                relations: ['author', 'sportCategory']
            });
            if (!updatedPost) {
                const response: PostResponseDto = {
                    success: false,
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                success: true,
                data: new PostDto(updatedPost),
                message: "Post updated successfully"
            };
            res.json(response);
        } catch (error) {
            const response: PostResponseDto = {
                success: false,
                error: "Failed to update post"
            };
            res.status(500).json(response);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const result = await postRepo.delete(Number(req.params.id));
            if (!result.affected) {
                const response: PostResponseDto = {
                    success: false,
                    error: "Post not found"
                };
                return res.status(404).json(response);
            }

            const response: PostResponseDto = {
                success: true,
                message: "Post deleted successfully"
            };
            res.status(200).json(response);
        } catch (error) {
            const response: PostResponseDto = {
                success: false,
                error: "Failed to delete post"
            };
            res.status(500).json(response);
        }
    }
} 