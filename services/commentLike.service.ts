import { AppDataSource } from '../data-source';
import { CommentLike } from '../entities/CommentLike';

const commentLikeRepo = AppDataSource.getRepository(CommentLike);

export const createCommentLike = (data: Partial<CommentLike>) => commentLikeRepo.save(commentLikeRepo.create(data));
export const getAllCommentLike = () => commentLikeRepo.find();
export const getCommentLikeById = (id: number) => commentLikeRepo.findOneBy({ id });
export const updateCommentLike = async (id: number, data: Partial<CommentLike>) => {
    const entity = await commentLikeRepo.findOneBy({ id });
    if (!entity) return null;
    commentLikeRepo.merge(entity, data);
    return commentLikeRepo.save(entity);
};
export const deleteCommentLike = (id: number) => commentLikeRepo.delete({ id }); 