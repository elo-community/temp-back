import { PostLike } from '../entities/post/PostLike';

export class PostLikeDto {
    userId: number;
    isLiked: boolean;

    constructor(postLike: PostLike) {
        this.userId = postLike.user?.id || 0;
        this.isLiked = postLike.isLiked || false;
    }
}

export interface PostLikeResponseDto {
    success: boolean;
    data?: PostLikeDto | PostLikeDto[] | any;
    message?: string;
    error?: string;
} 