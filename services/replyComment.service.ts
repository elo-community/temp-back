import { AppDataSource } from '../data-source';
import { ReplyComment } from '../entities/ReplyComment';

const replyCommentRepo = AppDataSource.getRepository(ReplyComment);

export const createReplyComment = (data: Partial<ReplyComment>) => replyCommentRepo.save(replyCommentRepo.create(data));
export const getAllReplyComment = () => replyCommentRepo.find();
export const getReplyCommentById = (id: number) => replyCommentRepo.findOneBy({ id });
export const updateReplyComment = async (id: number, data: Partial<ReplyComment>) => {
    const entity = await replyCommentRepo.findOneBy({ id });
    if (!entity) return null;
    replyCommentRepo.merge(entity, data);
    return replyCommentRepo.save(entity);
};
export const deleteReplyComment = (id: number) => replyCommentRepo.delete({ id }); 