import { AppDataSource } from '../data-source';
import { PostDto } from '../dtos/post.dto';
import { Post } from '../entities/post/Post';
import { SportCategory } from '../entities/SportCategory';
import { User } from '../entities/User';

export class PostService {
    private repo = AppDataSource.getRepository(Post);
    private userRepo = AppDataSource.getRepository(User);
    private sportCategoryRepo = AppDataSource.getRepository(SportCategory);

    async create(data: Partial<Post>): Promise<PostDto> {
        const post = this.repo.create(data);
        const savedPost = await this.repo.save(post);
        return new PostDto(savedPost);
    }

    async findAll(): Promise<PostDto[]> {
        const posts = await this.repo.find({
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });
        return posts.map(post => new PostDto(post));
    }

    async findById(id: number): Promise<PostDto | null> {
        const post = await this.repo.findOne({
            where: { id },
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });
        return post ? new PostDto(post) : null;
    }

    async findByAuthor(authorId: number): Promise<PostDto[]> {
        const posts = await this.repo.find({
            where: { author: { id: authorId } },
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });
        return posts.map(post => new PostDto(post));
    }

    async findBySportCategory(categoryId: number): Promise<PostDto[]> {
        const posts = await this.repo.find({
            where: { sportCategory: { id: categoryId } },
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });
        return posts.map(post => new PostDto(post));
    }

    async findByType(type: string): Promise<PostDto[]> {
        const posts = await this.repo.find({
            where: { type },
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });
        return posts.map(post => new PostDto(post));
    }

    async findVisiblePosts(): Promise<PostDto[]> {
        const posts = await this.repo.find({
            where: { isHidden: false },
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });
        return posts.map(post => new PostDto(post));
    }

    async update(id: number, data: Partial<Post>): Promise<PostDto | null> {
        const post = await this.repo.findOne({
            where: { id },
            relations: ['sportCategory', 'comments', 'likes', 'likes.post', 'likes.user', 'mehs', 'mehs.post', 'mehs.user']
        });

        if (!post) return null;

        // Update only the fields that are provided in data
        Object.assign(post, data);

        const updatedPost = await this.repo.save(post);
        return new PostDto(updatedPost);
    }

    async updateExposure(id: number, exposure: boolean): Promise<PostDto | null> {
        return this.update(id, { isHidden: !exposure });
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }

    async hidePost(id: number): Promise<PostDto | null> {
        return this.update(id, { isHidden: true });
    }

    async showPost(id: number): Promise<PostDto | null> {
        return this.update(id, { isHidden: false });
    }
} 