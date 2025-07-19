import { Post } from '../entities/Post';

export class PostDto {
    id: number;
    title?: string;
    content?: string;
    type?: string;
    isHidden?: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id: number;
        nickname?: string;
    };
    sportCategory: {
        id: number;
        name?: string;
    };
    location?: string;
    matchDate?: string;
    matchLocation?: string;
    matchTime?: string;
    tokenReward?: number;
    validUntil?: string;
    elo?: string;
    preferredElo?: string;

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.type = post.type;
        this.isHidden = post.isHidden;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.author = {
            id: post.author.id,
            nickname: post.author.nickname
        };
        this.sportCategory = {
            id: post.sportCategory.id,
            name: post.sportCategory.name
        };
        this.location = post.location;
        this.matchDate = post.matchDate;
        this.matchLocation = post.matchLocation;
        this.matchTime = post.matchTime;
        this.tokenReward = post.tokenReward;
        this.validUntil = post.validUntil;
        this.elo = post.elo;
        this.preferredElo = post.preferredElo;
    }
}

export interface PostResponseDto {
    success: boolean;
    data?: PostDto | PostDto[];
    message?: string;
    error?: string;
} 