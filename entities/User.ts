import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  wallet_address?: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  nickname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'datetime', name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column({ type: 'decimal', precision: 20, scale: 8, name: 'token_amount', nullable: false })
  tokenAmount!: number;

  @Column({ type: 'varchar', length: 255, name: 'profile_image_url', nullable: true })
  profileImageUrl?: string;

  // Relations (examples)
  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];
} 