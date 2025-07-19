import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity('comment_like')
export class CommentLike {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Comment, { nullable: false })
    @JoinColumn({ name: 'comment_id' })
    comment!: Comment;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'boolean', name: 'is_liked', nullable: true })
    isLiked?: boolean;
} 