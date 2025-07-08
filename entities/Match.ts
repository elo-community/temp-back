import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  player1!: User;

  @ManyToOne(() => User)
  player2!: User;

  @Column()
  sport!: string;

  @Column()
  result!: string; // 예: 'player1_win', 'player2_win', 'draw'

  @CreateDateColumn()
  playedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
export { } 