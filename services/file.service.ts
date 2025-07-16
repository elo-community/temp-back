import { In } from 'typeorm';
import { AppDataSource } from '../data-source';
import { File } from '../entities/File';

const fileRepo = AppDataSource.getRepository(File);

export const createFile = (data: Partial<File>) => fileRepo.save(fileRepo.create(data));
export const getFilesByUser = (userId: number) => fileRepo.find({ where: { user: { id: userId } } });
export const getFilesByPost = (postId: number) => fileRepo.find({ where: { post: { id: postId } } });
export const updateUsedInContent = async (usedUrls: string[]) => {
    await fileRepo.update({ s3Url: In(usedUrls) }, { usedInContent: true });
};
export const deleteUnusedFiles = async (userId?: number, postId?: number) => {
    const where: any = { usedInContent: false };
    if (userId) where.user = { id: userId };
    if (postId) where.post = { id: postId };
    const unusedFiles = await fileRepo.find({ where });
    for (const file of unusedFiles) {
        await fileRepo.remove(file);
    }
    return unusedFiles;
}; 