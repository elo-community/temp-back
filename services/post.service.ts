import { AppDataSource } from '../data-source';
import { Post } from '../entities/Post';

export class PostService {
    private repo = AppDataSource.getRepository(Post);

    async create(data: Partial<Post>) {
        const post = this.repo.create(data);
        return this.repo.save(post);
    }

    async findAll() {
        return this.repo.find();
    }

    async findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<Post>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.repo.delete(id);
        return result.affected;
    }
} 