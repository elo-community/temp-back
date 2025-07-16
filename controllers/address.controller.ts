import { Request, Response } from 'express';
import * as addressService from '../services/address.service';

export const createAddress = async (req: Request, res: Response) => {
    const entity = await addressService.createAddress(req.body);
    res.status(201).json(entity);
};

export const getAllAddress = async (_: Request, res: Response) => {
    res.json(await addressService.getAllAddress());
};

export const getAddressById = async (req: Request, res: Response) => {
    const entity = await addressService.getAddressById(Number(req.params.id));
    if (!entity) {
        res.status(404).json({ error: 'Not found' });
        return;
    };
    res.json(entity);
};

export const updateAddress = async (req: Request, res: Response) => {
    const entity = await addressService.updateAddress(Number(req.params.id), req.body);
    if (!entity) {
        res.status(404).json({ error: 'Not found' });
        return;
    };
    res.json(entity);
};

export const deleteAddress = async (req: Request, res: Response) => {
    await addressService.deleteAddress(Number(req.params.id));
    res.json({ message: 'Deleted' });
}; 