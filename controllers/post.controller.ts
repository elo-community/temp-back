import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PostDto } from '../dtos/post.dto';
import { Post } from '../entities/Post';

const postRepo = AppDataSource.getRepository(Post);

export class PostController {
    async create(req: Request, res: Response) {
        const authorId = 0;
        const myElo = 1000;
        const { content: content,
            title: title,
            postType: postType,
            matchDate: matchDate,
            matchLocation: matchLocation,
            matchTime: matchTime,
            tokenReward: tokenReward,
            validityPeriod: validUntil,
            category: sportCategoryId,
            elo: elo,
            location: location,
            preferredElo: preferredElo,
        } = req.body;
        console.log(req.body)
        const post = postRepo.create({
            sportCategoryId,
            content,
            title,
            type: postType,
            isHidden: false,
            matchDate,
            matchLocation,
            matchTime,
            tokenReward,
            validUntil,
            authorId,
            elo,
            location,
            preferredElo,
        });
        const savedPost = await postRepo.save(post);
        res.json(new PostDto(savedPost));
    }

    async findAll(req: Request, res: Response) {
        const posts = await postRepo.find();
        res.json(posts.map((p: Post) => new PostDto(p)));
    }

    async findOne(req: Request, res: Response) {
        const post = await postRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!post) return res.status(404).end();
        res.json(new PostDto(post));
    }

    async update(req: Request, res: Response) {
        await postRepo.update(Number(req.params.id), req.body);
        const updatedPost = await postRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!updatedPost) return res.status(404).end();
        res.json(new PostDto(updatedPost));
    }

    async remove(req: Request, res: Response) {
        const result = await postRepo.delete(Number(req.params.id));
        if (!result.affected) return res.status(404).end();
        res.status(204).end();
    }
} 