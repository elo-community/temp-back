import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './Match';
import { SportCategory } from './SportCategory';
import { User } from './User';

@Entity('elo_history')
export class EloHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Match, { nullable: false })
  @JoinColumn({ name: 'match_id' })
  match!: Match;

  @Column({ type: 'int', name: 'elo_change', nullable: false })
  eloChange!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason?: string;

  @Column({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column({ type: 'int', name: 'elo_before', nullable: true })
  eloBefore?: number;

  @Column({ type: 'int', name: 'elo_after', nullable: true })
  eloAfter?: number;

  @ManyToOne(() => SportCategory, { nullable: false })
  @JoinColumn({ name: 'sport_category_id' })
  sportCategory!: SportCategory;
}