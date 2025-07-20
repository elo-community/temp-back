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
    walletAddress?: string;
    nickname?: string;
    email?: string;
    tokenAmount: number;
    availableToken: number;
    profileImageUrl?: string;
    createdAt: Date;
    addresses: AddressDto[];

    constructor(user: User) {
        this.id = user.id;
        this.walletAddress = user.walletAddress;
        this.nickname = user.nickname;
        this.email = user.email;
        this.tokenAmount = user.tokenAmount || 0;
        this.availableToken = user.availableToken || 0;
        this.profileImageUrl = user.profileImageUrl;
        this.createdAt = user.createdAt;
        this.addresses = (user.addresses || []).map(addr => new AddressDto(addr));
    }
} 