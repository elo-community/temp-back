import { AppDataSource } from '../data-source';
import { PostLikeDto } from '../dtos/postLike.dto';
import { Post } from '../entities/post/Post';
import { PostLike } from '../entities/post/PostLike';
import { User } from '../entities/User';

export class PostLikeService {
    private repo = AppDataSource.getRepository(PostLike);
    private postRepo = AppDataSource.getRepository(Post);
    private userRepo = AppDataSource.getRepository(User);

    async create(data: Partial<PostLike>): Promise<PostLikeDto> {
        const postLike = this.repo.create(data);
        const savedPostLike = await this.repo.save(postLike);
        return new PostLikeDto(savedPostLike);
    }

    async findAll(): Promise<PostLikeDto[]> {
        const postLikes = await this.repo.find({
            relations: ['post', 'user']
        });
        return postLikes.map(postLike => new PostLikeDto(postLike));
    }

    async findById(id: number): Promise<PostLikeDto | null> {
        const postLike = await this.repo.findOne({
            where: { id },
            relations: ['post', 'user']
        });
        return postLike ? new PostLikeDto(postLike) : null;
    }

    async findByPost(postId: number): Promise<PostLikeDto[]> {
        const postLikes = await this.repo.find({
            where: { post: { id: postId } },
            relations: ['post', 'user']
        });
        return postLikes.map(postLike => new PostLikeDto(postLike));
    }

    async findByUser(userId: number): Promise<PostLikeDto[]> {
        const postLikes = await this.repo.find({
            where: { user: { id: userId } },
            relations: ['post', 'user']
        });
        return postLikes.map(postLike => new PostLikeDto(postLike));
    }

    async findByPostAndUser(postId: number, userId: number): Promise<PostLikeDto | null> {
        const postLike = await this.repo.findOne({
            where: {
                post: { id: postId },
                user: { id: userId }
            },
            relations: ['post', 'user']
        });
        return postLike ? new PostLikeDto(postLike) : null;
    }

    async findLikedByPost(postId: number): Promise<PostLikeDto[]> {
        const postLikes = await this.repo.find({
            where: {
                post: { id: postId },
                isLiked: true
            },
            relations: ['post', 'user']
        });
        return postLikes.map(postLike => new PostLikeDto(postLike));
    }

    async update(id: number, data: Partial<PostLike>): Promise<PostLikeDto | null> {
        const postLike = await this.repo.findOneBy({ id });
        if (!postLike) return null;

        this.repo.merge(postLike, data);
        const updatedPostLike = await this.repo.save(postLike);
        return new PostLikeDto(updatedPostLike);
    }

    async toggleLike(postId: number, userId: number): Promise<PostLikeDto | null> {
        let postLike = await this.repo.findOne({
            where: {
                post: { id: postId },
                user: { id: userId }
            },
            relations: ['post', 'user']
        });

        if (!postLike) {
            // Create new like
            postLike = this.repo.create({
                post: { id: postId },
                user: { id: userId },
                isLiked: true
            });
        } else {
            // Toggle existing like
            postLike.isLiked = !postLike.isLiked;
        }

        const savedPostLike = await this.repo.save(postLike);
        return new PostLikeDto(savedPostLike);
    }

    async likePost(postId: number, userId: number): Promise<PostLikeDto | null> {
        let postLike = await this.repo.findOne({
            where: {
                post: { id: postId },
                user: { id: userId }
            },
            relations: ['post', 'user']
        });

        if (!postLike) {
            postLike = this.repo.create({
                post: { id: postId },
                user: { id: userId },
                isLiked: true
            });
        } else {
            postLike.isLiked = true;
        }

        const savedPostLike = await this.repo.save(postLike);
        return new PostLikeDto(savedPostLike);
    }

    async unlikePost(postId: number, userId: number): Promise<PostLikeDto | null> {
        const postLike = await this.repo.findOne({
            where: {
                post: { id: postId },
                user: { id: userId }
            },
            relations: ['post', 'user']
        });

        if (!postLike) return null;

        postLike.isLiked = false;
        const savedPostLike = await this.repo.save(postLike);
        return new PostLikeDto(savedPostLike);
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

    async getLikeCount(postId: number): Promise<number> {
        return this.repo.count({
            where: {
                post: { id: postId },
                isLiked: true
            }
        });
    }
} 