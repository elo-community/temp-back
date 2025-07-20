import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const user = await userService.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const getUserByWalletAddress = async (req: Request, res: Response) => {
    try {
        const { walletAddress } = req.params;
        const user = await userService.findByWalletAddress(walletAddress);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const user = await userService.update(id, req.body);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const deleted = await userService.delete(id);
        if (!deleted) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ message: `User with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const updateTokenAmount = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { amount } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }

        if (typeof amount !== 'number') {
            res.status(400).json({ error: "Invalid amount" });
            return;
        }

        const user = await userService.updateTokenAmount(id, amount);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};

export const updateAvailableToken = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { amount } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }

        if (typeof amount !== 'number') {
            res.status(400).json({ error: "Invalid amount" });
            return;
        }

        const user = await userService.updateAvailableToken(id, amount);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};
