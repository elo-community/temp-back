import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, name: 'network_name', nullable: true })
    networkName?: string;

    @Column({ type: 'varchar', length: 255, name: 'network_address', nullable: true })
    networkAddress?: string;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    constructor(networkName: string, networkAddress: string, user: User) {
        this.networkName = networkName;
        this.networkAddress = networkAddress;
        this.user = user;
    }
} 