import { Address } from "../entities/Address";
import { User } from "../entities/User";

class AddressDto {
    id: number;
    networkName?: string;
    networkAddress?: string;

    constructor(address: Address) {
        this.id = address.id;
        this.networkName = address.networkName;
        this.networkAddress = address.networkAddress;
    }
}

export class UserDto {
    id: number;
    email: string;
    walletAddress: string;
    nickname: string;
    token: number;
    createdAt: Date;
    addresses: AddressDto[];

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email || '';
        this.walletAddress = user.walletAddress || '';
        this.nickname = user.nickname || '';
        this.token = user.tokenAmount || 0;
        this.createdAt = user.createdAt;
        this.addresses = (user.addresses || []).map(addr => new AddressDto(addr));
    }
} 