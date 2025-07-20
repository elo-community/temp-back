import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('token_reward')
export class TokenReward {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    rewardType?: string;

    @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
    amount?: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    reason?: string;

    @Column({ type: 'timestamp', name: 'created_at', nullable: false })
    createdAt!: Date;

    @Column({ type: 'timestamp', name: 'updated_at', nullable: false })
    updatedAt!: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    rewardStatus?: string;
}
