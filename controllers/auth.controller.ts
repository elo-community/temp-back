import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserDto } from '../dtos/user.dto';
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, walletAddress, nickname } = req.body;
        const user = userRepo.create({ email, password, wallet_address: walletAddress, nickname });
        await userRepo.save(user);
        res.status(201).json(new UserDto(user));
    } catch (err) {
        res.status(400).json({ error: "User creation failed", details: err });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //로그인로직
        const user = await userRepo.findOneBy({ email, password });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        res.status(201).json(new UserDto(user));
    } catch (err) {
        res.status(400).json({ error: "User creation failed", details: err });
    }
};