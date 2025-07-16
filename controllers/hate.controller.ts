import { Request, Response } from 'express';
import * as hateService from '../services/hate.service';

export const createHate = async (req: Request, res: Response) => {
    const entity = await hateService.createHate(req.body);
    res.status(201).json(entity);
};

export const getAllHate = async (_: Request, res: Response) => {
    res.json(await hateService.getAllHate());
};

export const getHateById = async (req: Request, res: Response) => {
    const entity = await hateService.getHateById(Number(req.params.id));
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const updateHate = async (req: Request, res: Response) => {
    const entity = await hateService.updateHate(Number(req.params.id), req.body);
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const deleteHate = async (req: Request, res: Response) => {
    await hateService.deleteHate(Number(req.params.id));
    res.json({ message: 'Deleted' });
}; 