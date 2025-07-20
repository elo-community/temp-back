import { AppDataSource } from "../data-source";
import { UserDto } from "../dtos/user.dto";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export class UserService {
    async findAll(): Promise<UserDto[]> {
        const users = await userRepo.find({
            relations: ['addresses']
        });
        return users.map(user => new UserDto(user));
    }

    async findById(id: number): Promise<UserDto | null> {
        const user = await userRepo.findOne({
            where: { id },
            relations: ['addresses']
        });
        return user ? new UserDto(user) : null;
    }

    async findByWalletAddress(walletAddress: string): Promise<UserDto | null> {
        const user = await userRepo.findOne({
            where: { walletAddress },
            relations: ['addresses']
        });
        return user ? new UserDto(user) : null;
    }

    async findByEmail(email: string): Promise<UserDto | null> {
        const user = await userRepo.findOne({
            where: { email },
            relations: ['addresses']
        });
        return user ? new UserDto(user) : null;
    }

    async create(userData: Partial<User>): Promise<UserDto> {
        const user = userRepo.create(userData);
        const savedUser = await userRepo.save(user);
        return new UserDto(savedUser);
    }

    async update(id: number, userData: Partial<User>): Promise<UserDto | null> {
        const user = await userRepo.findOneBy({ id });
        if (!user) return null;

        userRepo.merge(user, userData);
        const updatedUser = await userRepo.save(user);
        return new UserDto(updatedUser);
    }

    async delete(id: number): Promise<boolean> {
        const result = await userRepo.delete(id);
        return result.affected !== 0;
    }

    async updateTokenAmount(id: number, amount: number): Promise<UserDto | null> {
        const user = await userRepo.findOneBy({ id });
        if (!user) return null;

        user.tokenAmount = amount;
        const updatedUser = await userRepo.save(user);
        return new UserDto(updatedUser);
    }

    async updateAvailableToken(id: number, amount: number): Promise<UserDto | null> {
        const user = await userRepo.findOneBy({ id });
        if (!user) return null;

        user.availableToken = amount;
        const updatedUser = await userRepo.save(user);
        return new UserDto(updatedUser);
    }
} 