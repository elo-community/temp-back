import * as dotenv from "dotenv";
import "reflect-metadata";

import express from "express";
import { AppDataSource } from "./data-source";
import addressRoutes from './routes/address.routes';
import authRoutes from "./routes/auth.routes";
import commentRoutes from "./routes/comment.routes";
import commentLikeRoutes from './routes/commentLike.routes';
import fileRoutes from './routes/file.routes';
import hateRoutes from './routes/hate.routes';
import matchRoutes from './routes/match.routes';
import postRoutes from './routes/post.routes';
import replyCommentRoutes from './routes/replyComment.routes';
import sportCategoryRoutes from './routes/sportCategory.routes';
import userRoutes from "./routes/user.routes";
import userEloRoutes from './routes/userElo.routes';
import { seedComments, seedPosts, seedSportCategories, seedUsers } from "./utils/seed";


dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/user-elos', userEloRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/hates', hateRoutes);
app.use('/api/v1/reply-comments', replyCommentRoutes);
app.use('/api/v1/files', fileRoutes);
// post 라우트만 유지 (comment는 post 내부에 중첩됨)
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/sport-categories', sportCategoryRoutes);
app.use('/api/v1/comments', commentLikeRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connected!");

        // 초기 데이터 생성
        await seedSportCategories();
        await seedUsers();
        await seedPosts();
        await seedComments();

        app.listen(5000, () => {
            console.log("Server started on port 5000");
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });