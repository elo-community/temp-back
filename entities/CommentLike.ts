import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

@Entity('comment_like')
export class CommentLike {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Comment, { nullable: false })
    @JoinColumn({ name: 'comment_id' })
    comment!: Comment;

    @ManyToOne(() => Post, { nullable: false })
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'boolean', name: 'is_liked', nullable: true })
    isLiked?: boolean;
} 