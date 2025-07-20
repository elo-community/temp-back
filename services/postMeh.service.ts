import { AppDataSource } from '../data-source';
import { PostMehDto } from '../dtos/postMeh.dto';
import { Post } from '../entities/post/Post';
import { PostMeh } from '../entities/post/PostMeh';
import { User } from '../entities/User';

export class PostMehService {
    private repo = AppDataSource.getRepository(PostMeh);
    private postRepo = AppDataSource.getRepository(Post);
    private userRepo = AppDataSource.getRepository(User);

    async create(data: Partial<PostMeh>): Promise<PostMehDto> {
        const postMeh = this.repo.create(data);
        const savedPostMeh = await this.repo.save(postMeh);
        return new PostMehDto(savedPostMeh);
    }

    async findAll(): Promise<PostMehDto[]> {
        const postMehs = await this.repo.find({
            relations: ['post', 'user']
        });
        return postMehs.map(postMeh => new PostMehDto(postMeh));
    }

    async findById(id: number): Promise<PostMehDto | null> {
        const postMeh = await this.repo.findOne({
            where: { id },
            relations: ['post', 'user']
        });
        return postMeh ? new PostMehDto(postMeh) : null;
    }

    async findByPost(postId: number): Promise<PostMehDto[]> {
        const postMehs = await this.repo.find({
            where: { post: { id: postId } },
            relations: ['post', 'user']
        });
        return postMehs.map(postMeh => new PostMehDto(postMeh));
    }

    async findByUser(userId: number): Promise<PostMehDto[]> {
        const postMehs = await this.repo.find({
            where: { user: { id: userId } },
            relations: ['post', 'user']
        });
        return postMehs.map(postMeh => new PostMehDto(postMeh));
    }

    async findByPostAndUser(postId: number, userId: number): Promise<PostMehDto | null> {
        const postMeh = await this.repo.findOne({
            where: {
                post: { id: postId },
                user: { id: userId }
            },
            relations: ['post', 'user']
        });
        return postMeh ? new PostMehDto(postMeh) : null;
    }

    async findMehedByPost(postId: number): Promise<PostMehDto[]> {
        const postMehs = await this.repo.find({
            where: {
                post: { id: postId },
                isMehed: true
            },
            relations: ['post', 'user']
        });
        return postMehs.map(postMeh => new PostMehDto(postMeh));
    }

    async update(id: number, data: Partial<PostMeh>): Promise<PostMehDto | null> {
        const postMeh = await this.repo.findOneBy({ id });
        if (!postMeh) return null;

        this.repo.merge(postMeh, data);
        const updatedPostMeh = await this.repo.save(postMeh);
        return new PostMehDto(updatedPostMeh);
    }

    async toggleMeh(postId: number, userId: number): Promise<PostMehDto | null> {
        let postMeh = await this.repo.findOne({
            where: {
                post: { id: postId },
                user: { id: userId }
            },
            relations: ['post', 'user']
        });

        if (!postMeh) {
            // Create new meh
            postMeh = this.repo.create({
                post: { id: postId },
                user: { id: userId },
                isMehed: true
            });
        } else {
            // Toggle existing meh
            postMeh.isMehed = !postMeh.isMehed;
        }

        const savedPostMeh = await this.repo.save(postMeh);
        return new PostMehDto(savedPostMeh);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }

    async removeByPostAndUser(postId: number, userId: number): Promise<boolean> {
        const result = await this.repo.delete({
            post: { id: postId },
            user: { id: userId }
        });
        return result.affected !== 0;
    }

    async getMehCount(postId: number): Promise<number> {
        return this.repo.count({
            where: {
                post: { id: postId },
                isMehed: true
            }
        });
    }
} 