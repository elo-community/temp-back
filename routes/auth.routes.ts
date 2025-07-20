import { Request, Response, Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', (req: Request, res: Response) => { void authController.login(req, res); });

export default router;