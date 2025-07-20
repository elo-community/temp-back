import { Column, Entity } from "typeorm";
import { Post } from "../post/Post";

@Entity('match_post')
export class MatchPost extends Post {
    @Column({ type: 'varchar', length: 255, nullable: true })
    matchDate?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    matchLocation?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    matchTime?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    validUntil?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    postStatus?: string;
}