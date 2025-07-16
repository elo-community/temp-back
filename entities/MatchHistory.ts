import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Match } from "./Match";
import { User } from "./User";

@Entity()
export class MatchHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Match, { nullable: false })
    match!: Match;

    @Column()
    action!: string; // 'requested', 'accepted', 'rejected', 'result_set' 등

    @ManyToOne(() => User, { nullable: false })
    actor!: User;

    @CreateDateColumn()
    timestamp!: Date;
} 