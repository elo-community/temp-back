import { Router } from "express";
import { SportCategoryController } from "../controllers/sportCategory.controller";

const router = Router();
const controller = new SportCategoryController();

router.get("/", (req, res) => { void controller.getAll(req, res); });
router.get("/:id", (req, res) => { void controller.getById(req, res); });
router.post("/", (req, res) => { void controller.create(req, res); });
router.put("/:id", (req, res) => { void controller.update(req, res); });
router.delete("/:id", (req, res) => { void controller.delete(req, res); });

export default router; 