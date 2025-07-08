import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Match } from "./entities/Match";
import { EloHistory } from "./entities/EloHistory";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import { Like } from "./entities/Like";
import { TokenTx } from "./entities/TokenTransaction";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User, Match, EloHistory, Post, Comment, Like, TokenTx],
});
