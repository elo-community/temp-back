import { AppDataSource } from '../data-source';
import { UserElo } from '../entities/UserElo';

const userEloRepo = AppDataSource.getRepository(UserElo);

export const createUserElo = (data: Partial<UserElo>) => userEloRepo.save(userEloRepo.create(data));
export const getAllUserElo = () => userEloRepo.find();
export const getUserEloById = (id: number) => userEloRepo.findOneBy({ id });
export const updateUserElo = async (id: number, data: Partial<UserElo>) => {
    const entity = await userEloRepo.findOneBy({ id });
    if (!entity) return null;
    userEloRepo.merge(entity, data);
    return userEloRepo.save(entity);
};
export const deleteUserElo = (id: number) => userEloRepo.delete({ id }); 