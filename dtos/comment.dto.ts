export interface CommentDto {
    id: number;
    userId: number;
    postId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCommentDto {
    userId: number;
    postId: number;
    content: string;
}

export interface UpdateCommentDto {
    content?: string;
}

export interface CommentResponseDto {
    success: boolean;
    data?: CommentDto | CommentDto[];
    message?: string;
    error?: string;
} 