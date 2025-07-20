import { AppDataSource } from '../data-source';
import { PostHate } from '../entities/post/PostHate';

const hateRepo = AppDataSource.getRepository(PostHate);

export const createHate = (data: Partial<PostHate>) => hateRepo.save(hateRepo.create(data));
export const getAllHate = () => hateRepo.find();
export const getHateById = (id: number) => hateRepo.findOneBy({ id });
export const updateHate = async (id: number, data: Partial<PostHate>) => {
    const entity = await hateRepo.findOneBy({ id });
    if (!entity) return null;
    hateRepo.merge(entity, data);
    return hateRepo.save(entity);
};
export const deleteHate = (id: number) => hateRepo.delete({ id }); 