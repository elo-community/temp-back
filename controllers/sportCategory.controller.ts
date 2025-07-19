import { Request, Response } from "express";
import { SportCategoryResponseDto } from "../dtos/sportCategory.dto";
import { SportCategoryService } from "../services/sportCategory.service";

export class SportCategoryController {
    private sportCategoryService = new SportCategoryService();

    async getAll(req: Request, res: Response) {
        try {
            const categories = await this.sportCategoryService.findAll();
            const response: SportCategoryResponseDto = {
                success: true,
                data: categories,
                message: "Sport categories retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: SportCategoryResponseDto = {
                success: false,
                error: "Failed to fetch sport categories"
            };
            res.status(500).json(response);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const category = await this.sportCategoryService.findById(id);

            if (!category) {
                const response: SportCategoryResponseDto = {
                    success: false,
                    error: "Sport category not found"
                };
                return res.status(404).json(response);
            }

            const response: SportCategoryResponseDto = {
                success: true,
                data: category,
                message: "Sport category retrieved successfully"
            };
            res.json(response);
        } catch (error) {
            const response: SportCategoryResponseDto = {
                success: false,
                error: "Failed to fetch sport category"
            };
            res.status(500).json(response);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const category = await this.sportCategoryService.create(req.body);
            const response: SportCategoryResponseDto = {
                success: true,
                data: category,
                message: "Sport category created successfully"
            };
            res.status(201).json(response);
        } catch (error) {
            const response: SportCategoryResponseDto = {
                success: false,
                error: "Failed to create sport category"
            };
            res.status(500).json(response);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const category = await this.sportCategoryService.update(id, req.body);

            if (!category) {
                const response: SportCategoryResponseDto = {
                    success: false,
                    error: "Sport category not found"
                };
                return res.status(404).json(response);
            }

            const response: SportCategoryResponseDto = {
                success: true,
                data: category,
                message: "Sport category updated successfully"
            };
            res.json(response);
        } catch (error) {
            const response: SportCategoryResponseDto = {
                success: false,
                error: "Failed to update sport category"
            };
            res.status(500).json(response);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const success = await this.sportCategoryService.delete(id);

            if (!success) {
                const response: SportCategoryResponseDto = {
                    success: false,
                    error: "Sport category not found"
                };
                return res.status(404).json(response);
            }

            const response: SportCategoryResponseDto = {
                success: true,
                message: "Sport category deleted successfully"
            };
            res.status(200).json(response);
        } catch (error) {
            const response: SportCategoryResponseDto = {
                success: false,
                error: "Failed to delete sport category"
            };
            res.status(500).json(response);
        }
    }
} 