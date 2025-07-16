import { Request, Response } from 'express';
import { createFile as createFileService, deleteUnusedFiles, getFilesByUser, updateUsedInContent } from '../services/file.service';

export const createFile = async (req: Request, res: Response) => {
    const entity = await createFileService(req.body);
    res.status(201).json(entity);
};

export const getAllFiles = async (req: Request, res: Response) => {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    if (!userId) {
        res.status(400).json({ error: 'userId required' })
        return;
    };
    res.json(await getFilesByUser(userId));
};

export const getFileById = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    if (!userId) {
        res.status(400).json({ error: 'id required' });
        return;
    };
    res.json(await getFilesByUser(userId));
};

export const updateFile = async (req: Request, res: Response) => {
    const urls = Array.isArray(req.body.s3Url) ? req.body.s3Url : [req.body.s3Url];
    await updateUsedInContent(urls);
    res.json({ message: 'Updated' });
};

export const deleteFile = async (req: Request, res: Response) => {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    await deleteUnusedFiles(userId);
    res.json({ message: 'Deleted' });
};
