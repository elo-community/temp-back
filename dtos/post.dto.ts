import { Post } from '../entities/Post';

export class PostDto {
    id: number;
    title?: string;
    content?: string;
    type?: string;
    isHidden?: boolean;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    sportCategoryId: number;
    location?: string;
    matchDate?: string;
    matchLocation?: string;
    matchTime?: string;
    tokenReward?: number;
    validUntil?: string;

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.type = post.type;
        this.isHidden = post.isHidden;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.authorId = post.authorId;
        this.sportCategoryId = post.sportCategoryId;
        this.location = post.location;
        this.matchDate = post.matchDate;
        this.matchLocation = post.matchLocation;
        this.matchTime = post.matchTime;
        this.tokenReward = post.tokenReward;
        this.validUntil = post.validUntil;
    }
} 