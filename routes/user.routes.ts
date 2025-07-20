import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserByWalletAddress,
    updateAvailableToken,
    updateTokenAmount,
    updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/wallet/:walletAddress", getUserByWalletAddress);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/:id/token-amount", updateTokenAmount);
router.put("/:id/available-token", updateAvailableToken);
router.delete("/:id", deleteUser);

export default router;