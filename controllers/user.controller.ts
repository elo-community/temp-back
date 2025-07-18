import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserDto } from '../dtos/user.dto';
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);


export const getAllUsers = async (_req: Request, res: Response) => {
    const users = await userRepo.find();
    res.json(users.map((user) => new UserDto(user)));
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const user = await userRepo.findOneBy({ id });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(new UserDto(user));
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
        res.json(new UserDto(user));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const result = await userRepo.delete({ id: Number(req.params.id) });
    if (result.affected === 0) res.status(404).json({ error: "User not found" });
    else { res.json({ message: `[User][DELETE][Success] User id = ${req.params.id}` }) };
};
