import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from './Comment';
import { Like } from './Like';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => User, { nullable: false })
  // @JoinColumn({ name: 'author_id' })
  // author!: User;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 0 })
  authorId!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  content?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type?: string;

  @Column({ type: 'boolean', name: 'is_hidden', default: false })
  isHidden?: boolean;

  // @ManyToOne(() => SportCategory, { nullable: false })
  // @JoinColumn({ name: 'sport_category_id' })
  @Column({ type: 'varchar', length: 255, nullable: true, default: 0 })
  sportCategoryId!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'varchar', length: 255, name: 'match_date', nullable: true })
  matchDate?: string;

  @Column({ type: 'varchar', length: 255, name: 'match_location', nullable: true })
  matchLocation?: string;

  @Column({ type: 'varchar', length: 255, name: 'match_time', nullable: true })
  matchTime?: string;

  @Column({ type: 'decimal', precision: 20, scale: 8, name: 'reward_token', nullable: true })
  tokenReward?: number;

  @Column({ type: 'varchar', length: 255, name: 'valid_until', nullable: true })
  validUntil?: string;

  @Column({ type: 'varchar', length: 255, name: 'elo', nullable: true })
  elo?: string;

  @Column({ type: 'varchar', length: 255, name: 'preferred_elo', nullable: true })
  preferredElo?: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes?: Like[];
} 