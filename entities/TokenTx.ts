import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('token_tx')
export class TokenTx {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255, name: 'tx_hash', nullable: true })
  txHash?: string;

  @Column({ type: 'decimal', precision: 20, scale: 8, name: 'amount', nullable: true })
  amount?: number;

  @Column({ type: 'varchar', length: 255, name: 'reason', nullable: false })
  reason!: string;

  @Column({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt!: Date;
} 