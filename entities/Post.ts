import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Like } from "./Like";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  author!: User;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes!: Like[];
}
export { } 