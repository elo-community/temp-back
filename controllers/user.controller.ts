import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, walletAddress, nickname } = req.body;
        const user = userRepo.create({ email, password, walletAddress, nickname });
        await userRepo.save(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: "User creation failed", details: err });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    const users = await userRepo.find();
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
        }
        const user = await userRepo.findOneBy({ id });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await userRepo.findOneBy({ id: Number(req.params.id) });
    if (!user) res.status(404).json({ error: "User not found" });
    else {
        userRepo.merge(user, req.body);
        await userRepo.save(user);
        res.json(user);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const result = await userRepo.delete({ id: Number(req.params.id) });
    if (result.affected === 0) res.status(404).json({ error: "User not found" });
    else { res.json({ message: "User deleted" }) };
};
