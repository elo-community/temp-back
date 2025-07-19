export interface SportCategoryDto {
    id: number;
    name?: string;
    sortOrder?: number;
}

export interface CreateSportCategoryDto {
    name: string;
    sortOrder?: number;
}

export interface UpdateSportCategoryDto {
    name?: string;
    sortOrder?: number;
}

export interface SportCategoryResponseDto {
    success: boolean;
    data?: SportCategoryDto | SportCategoryDto[];
    message?: string;
    error?: string;
} 