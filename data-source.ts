import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Address } from "./entities/Address";
import { Comment } from "./entities/Comment";
import { CommentLike } from "./entities/CommentLike";
import { EloHistory } from "./entities/EloHistory";
import { Like } from "./entities/Like";
import { Match } from "./entities/Match";
import { MatchHistory } from "./entities/MatchHistory";
import { Post } from "./entities/Post";
import { SportCategory } from "./entities/SportCategory";
import { TokenTx } from "./entities/TokenTx";
import { User } from "./entities/User";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: [User, Address, Match, MatchHistory, EloHistory, Post, Comment, CommentLike, Like, TokenTx, SportCategory],
});
