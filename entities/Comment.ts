import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post/Post';
import { User } from './User';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Column({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  content!: string;
}
