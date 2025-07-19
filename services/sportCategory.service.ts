import { AppDataSource } from "../data-source";
import { SportCategory } from "../entities/SportCategory";

export class SportCategoryService {
    private sportCategoryRepository = AppDataSource.getRepository(SportCategory);

    async findAll(): Promise<SportCategory[]> {
        return await this.sportCategoryRepository.find({
            order: { sortOrder: 'ASC' }
        });
    }

    async findById(id: number): Promise<SportCategory | null> {
        return await this.sportCategoryRepository.findOne({ where: { id } });
    }

    async create(sportCategoryData: Partial<SportCategory>): Promise<SportCategory> {
        const sportCategory = this.sportCategoryRepository.create(sportCategoryData);
        return await this.sportCategoryRepository.save(sportCategory);
    }

    async update(id: number, sportCategoryData: Partial<SportCategory>): Promise<SportCategory | null> {
        await this.sportCategoryRepository.update(id, sportCategoryData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.sportCategoryRepository.delete(id);
        return result.affected !== 0;
    }
} 