import { Request, Response } from 'express';
import * as userEloService from '../services/userElo.service';

export const createUserElo = async (req: Request, res: Response) => {
    const entity = await userEloService.createUserElo(req.body);
    res.status(201).json(entity);
};

export const getAllUserElo = async (_: Request, res: Response) => {
    res.json(await userEloService.getAllUserElo());
};

export const getUserEloById = async (req: Request, res: Response) => {
    const entity = await userEloService.getUserEloById(Number(req.params.id));
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const updateUserElo = async (req: Request, res: Response) => {
    const entity = await userEloService.updateUserElo(Number(req.params.id), req.body);
    if (!entity) return res.status(404).json({ error: 'Not found' });
    res.json(entity);
};

export const deleteUserElo = async (req: Request, res: Response) => {
    await userEloService.deleteUserElo(Number(req.params.id));
    res.json({ message: 'Deleted' });
}; 