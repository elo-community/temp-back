import { Request, Response } from 'express';
import * as replyCommentService from '../services/replyComment.service';

export const createReplyComment = async (req: Request, res: Response) => {
    const entity = await replyCommentService.createReplyComment(req.body);
    res.status(201).json(entity);
};

export const getAllReplyComment = async (_: Request, res: Response) => {
    res.json(await replyCommentService.getAllReplyComment());
};

export const getReplyCommentById = async (req: Request, res: Response) => {
    const entity = await replyCommentService.getReplyCommentById(Number(req.params.id));
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const updateReplyComment = async (req: Request, res: Response) => {
    const entity = await replyCommentService.updateReplyComment(Number(req.params.id), req.body);
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const deleteReplyComment = async (req: Request, res: Response) => {
    await replyCommentService.deleteReplyComment(Number(req.params.id));
    res.json({ message: 'Deleted' });
}; 