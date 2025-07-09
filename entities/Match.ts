import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  player1!: User;

  @ManyToOne(() => User, { nullable: false })
  player2!: User;

  @Column()
  sport!: string;

  @Column({ default: 'pending' })
  result!: string;

  @Column({ default: 'requested' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
} 