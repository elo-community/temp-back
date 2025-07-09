import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { EloHistory } from "./EloHistory";
import { TokenTx } from "./TokenTransaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  walletAddress!: string;

  @Column()
  nickname!: string;

  @Column({ default: 1000 })
  elo!: number;

  @Column({ default: 0 })
  token!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => EloHistory, (eh) => eh.user)
  eloHistories!: EloHistory[];

  @OneToMany(() => TokenTx, (tt) => tt.user)
  tokenTransactions!: TokenTx[];
}
export { } 