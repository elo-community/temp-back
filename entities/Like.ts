import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post!: Post;

  @Column()
  isLike!: boolean; // true: 좋아요, false: 싫어요
}
export {} 