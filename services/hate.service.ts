import { AppDataSource } from '../data-source';
import { Hate } from '../entities/Hate';

const hateRepo = AppDataSource.getRepository(Hate);

export const createHate = (data: Partial<Hate>) => hateRepo.save(hateRepo.create(data));
export const getAllHate = () => hateRepo.find();
export const getHateById = (id: number) => hateRepo.findOneBy({ id });
export const updateHate = async (id: number, data: Partial<Hate>) => {
    const entity = await hateRepo.findOneBy({ id });
    if (!entity) return null;
    hateRepo.merge(entity, data);
    return hateRepo.save(entity);
};
export const deleteHate = (id: number) => hateRepo.delete({ id }); 