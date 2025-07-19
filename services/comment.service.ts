import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";

export class CommentService {
    private commentRepository = AppDataSource.getRepository(Comment);

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find({
            relations: ['user', 'post'],
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    id: true
                },
                post: {
                    id: true
                }
            },
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: number): Promise<Comment | null> {
        return await this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'post'],
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    id: true
                },
                post: {
                    id: true
                }
            }
        });
    }

    async findByPostId(postId: number): Promise<Comment[]> {
        return await this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ['user', 'post'],
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    id: true
                },
                post: {
                    id: true
                }
            },
            order: { createdAt: 'ASC' }
        });
    }

    async create(commentData: Partial<Comment>): Promise<Comment> {
        const comment = this.commentRepository.create({
            ...commentData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await this.commentRepository.save(comment);
    }

    async update(id: number, commentData: Partial<Comment>): Promise<Comment | null> {
        await this.commentRepository.update(id, {
            ...commentData,
            updatedAt: new Date()
        });
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.commentRepository.delete(id);
        return result.affected !== 0;
    }
} 