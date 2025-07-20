import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post/Post';
import { User } from './User';

@Entity('file')
export class File {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 512, name: 's3_url', nullable: false })
    s3Url!: string;

    @CreateDateColumn({ name: 'uploaded_at' })
    uploadedAt!: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @ManyToOne(() => Post, { nullable: true })
    @JoinColumn({ name: 'post_id' })
    post?: Post;

    @Column({ type: 'boolean', name: 'used_in_content', default: false })
    usedInContent!: boolean;
} 