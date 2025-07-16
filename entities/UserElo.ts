import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportCategory } from './SportCategory';
import { User } from './User';

@Entity('user_elo')
export class UserElo {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => SportCategory, { nullable: false })
    @JoinColumn({ name: 'sport_category_id' })
    sportCategory!: SportCategory;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'int', name: 'elo_score', nullable: true })
    eloScore?: number;

    @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt?: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    tier?: string;

    @Column({ type: 'varchar', length: 255, name: 'top_percent', nullable: true })
    topPercent?: string;
} 