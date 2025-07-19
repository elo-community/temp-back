import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { CommentLike } from "../entities/CommentLike";
import { User } from "../entities/User";

export class CommentLikeService {
    private commentLikeRepository = AppDataSource.getRepository(CommentLike);
    private commentRepository = AppDataSource.getRepository(Comment);
    private userRepository = AppDataSource.getRepository(User);

    async findByCommentId(commentId: number): Promise<CommentLike[]> {
        return await this.commentLikeRepository.find({
            where: { comment: { id: commentId } },
            relations: ['comment', 'user']
        });
    }

    async findByCommentAndUser(commentId: number, userId: number): Promise<CommentLike | null> {
        return await this.commentLikeRepository.findOne({
            where: {
                comment: { id: commentId },
                user: { id: userId }
            },
            relations: ['comment', 'user']
        });
    }

    async create(commentLikeData: Partial<CommentLike>): Promise<CommentLike> {
        const commentLike = this.commentLikeRepository.create({
            ...commentLikeData,
            isLiked: true // 기본적으로 좋아요 상태로 생성
        });
        return await this.commentLikeRepository.save(commentLike);
    }

    async toggleLike(commentId: number, userId: number): Promise<CommentLike> {
        // 기존 좋아요 확인
        const existingLike = await this.findByCommentAndUser(commentId, userId);

        if (existingLike) {
            // 기존 좋아요가 있으면 토글
            existingLike.isLiked = !existingLike.isLiked;
            return await this.commentLikeRepository.save(existingLike);
        } else {
            // CommentLike가 없으면 새로 생성
            const comment = await this.commentRepository.findOne({ where: { id: commentId } });
            const user = await this.userRepository.findOne({ where: { id: userId } });

            if (!comment || !user) {
                throw new Error("Comment or User not found");
            }

            return await this.create({
                comment,
                user
            });
        }
    }

    async delete(commentId: number, userId: number): Promise<boolean> {
        const result = await this.commentLikeRepository.delete({
            comment: { id: commentId },
            user: { id: userId }
        });
        return result.affected !== 0;
    }
} 