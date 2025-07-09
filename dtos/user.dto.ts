export class UserDto {
    id: number;
    email: string;
    walletAddress: string;
    nickname: string;
    elo: number;
    token: number;
    createdAt: Date;

    constructor(user: any) {
        this.id = user.id;
        this.email = user.email;
        this.walletAddress = user.walletAddress;
        this.nickname = user.nickname;
        this.elo = user.elo;
        this.token = user.token;
        this.createdAt = user.createdAt;
    }
} 