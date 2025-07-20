import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

export class AuthController {
    private userService = new UserService();

    async login(req: Request, res: Response) {
        const { email, accounts, idToken } = req.body;

        // 1. idToken(JWT) 검증
        let decoded: any;
        try {
            decoded = jwt.verify(idToken, process.env.ID_TOKEN_PUBLIC_KEY as string); // 공개키 or 시크릿
        } catch (e) {
            return res.status(401).json({ status: 'error', error: 'Invalid idToken' });
        }

        // 2. email/user_id 추출
        const userEmail = decoded.email || email;
        const userId = decoded.user_id;

        // 3. DB에서 회원 조회
        let user = userEmail ? await this.userService.findByEmail(userEmail) : null;
        if (!user && userId) {
            user = await this.userService.findById(userId);
        }

        // 4. 회원 없으면 생성
        if (!user) {
            user = await this.userService.create({
                email: userEmail,
                addresses: accounts, // accounts는 [{networkName, networkAddress}, ...] 형태여야 함
            });
        }

        // 5. access token 발급
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        return res.json({ status: 'success', accessToken });
    }
}