export interface CommentLikeDto {
    id: number;
    commentId: number;
    userId: number;
    isLiked?: boolean;
}

export interface CreateCommentLikeDto {
    commentId: number;
    userId: number;
    isLiked?: boolean;
}

export interface CommentLikeResponseDto {
    success: boolean;
    data?: CommentLikeDto | CommentLikeDto[];
    message?: string;
    error?: string;
} 