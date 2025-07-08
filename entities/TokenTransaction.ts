import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class TokenTx {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.tokenTransactions)
  user!: User;

  @Column()
  amount!: string;

  @Column()
  txHash!: string;

  @Column()
  reason!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
export { } 