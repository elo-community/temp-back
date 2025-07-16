import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportCategory } from './SportCategory';
import { User } from './User';

@Entity('match')
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id1' })
  user1!: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id2' })
  user2!: User;

  @ManyToOne(() => SportCategory, { nullable: false })
  @JoinColumn({ name: 'sport_category_id' })
  sportCategory!: SportCategory;

  @Column({ type: 'varchar', length: 255, nullable: true })
  result?: string;

  @Column({ type: 'datetime', name: 'match_date', nullable: false })
  matchDate!: Date;

  @Column({ type: 'boolean', name: 'is_handicap', nullable: true })
  isHandicap?: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status?: string;
} 