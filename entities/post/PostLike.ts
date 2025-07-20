import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../User';
import { Post } from './Post';

@Entity('post_like')
export class PostLike {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'boolean', name: 'is_liked', nullable: true })
  isLiked?: boolean;
} 