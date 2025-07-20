import { Post } from '../entities/post/Post';

export class PostDto {
    id: number;
    title?: string;
    content?: string;
    type?: string;
    isHidden?: boolean;
    createdAt: Date;
    updatedAt: Date;
    sportCategory: {
        id: number;
        name?: string;
    };
    likeCount: number;
    likedUserIds: number[];
    mehCount: number;
    mehedUserIds: number[];

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.type = post.type;
        this.isHidden = post.isHidden;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.sportCategory = {
            id: post.sportCategory?.id || 0,
            name: post.sportCategory?.name
        };

        // 좋아요 정보 처리
        const likedLikes = post.likes?.filter(like => like.isLiked) || [];
        this.likeCount = likedLikes.length;
        this.likedUserIds = likedLikes.map(like => like.user?.id || 0).filter(id => id !== 0);

        // Meh 정보 처리
        const mehedMehs = post.mehs?.filter(meh => meh.isMehed) || [];
        this.mehCount = mehedMehs.length;
        this.mehedUserIds = mehedMehs.map(meh => meh.user?.id || 0).filter(id => id !== 0);
    }
}

export interface PostResponseDto {
    status: "success" | "error";
    data?: PostDto | PostDto[];
    message?: string;
    error?: string;
} 