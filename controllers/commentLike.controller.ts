import { Request, Response } from 'express';
import * as commentLikeService from '../services/commentLike.service';

export const createCommentLike = async (req: Request, res: Response) => {
    const entity = await commentLikeService.createCommentLike(req.body);
    res.status(201).json(entity);
};

export const getAllCommentLike = async (_: Request, res: Response) => {
    res.json(await commentLikeService.getAllCommentLike());
};

export const getCommentLikeById = async (req: Request, res: Response) => {
    const entity = await commentLikeService.getCommentLikeById(Number(req.params.id));
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const updateCommentLike = async (req: Request, res: Response) => {
    const entity = await commentLikeService.updateCommentLike(Number(req.params.id), req.body);
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const deleteCommentLike = async (req: Request, res: Response) => {
    await commentLikeService.deleteCommentLike(Number(req.params.id));
    res.json({ message: 'Deleted' });
}; 