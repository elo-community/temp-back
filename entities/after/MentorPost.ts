import { Column, Entity } from "typeorm";
import { Post } from "../post/Post";

@Entity('mentor_post')
export class MentorPost extends Post {
    @Column({ type: 'varchar', length: 255, nullable: true })
    location?: string;

    @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
    tokenReward?: number;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'valid_until' })
    validUntil?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    postStatus?: string;
}