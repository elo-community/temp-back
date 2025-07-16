import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity('reply_comment')
export class ReplyComment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    content?: string;

    @ManyToOne(() => Comment, { nullable: false })
    @JoinColumn({ name: 'comment_id' })
    comment!: Comment;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'timestamp', name: 'created_at', nullable: false })
    createdAt!: Date;
} 