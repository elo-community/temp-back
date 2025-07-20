import { PostMeh } from '../entities/post/PostMeh';

export class PostMehDto {
    userId: number;
    isMehed?: boolean;

    constructor(postMeh: PostMeh) {
        this.userId = postMeh.user?.id || 0;
        this.isMehed = postMeh.isMehed;
    }
}

export interface PostMehResponseDto {
    status: "success" | "error";
    data?: PostMehDto | PostMehDto[] | any;
    message?: string;
    error?: string;
} 