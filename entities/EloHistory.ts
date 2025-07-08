import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class EloHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.eloHistories)
  user!: User;

  @Column() // elo 변동값
  change!: number;

  @Column() // 변동 이유(match_win, match_loss, admin_adjust, bonus_event 등)
  reason!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
export { } 