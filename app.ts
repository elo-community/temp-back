import * as dotenv from "dotenv";
import "reflect-metadata";

import express from "express";
import { AppDataSource } from "./data-source";
import addressRoutes from './routes/address.routes';
import authRoutes from "./routes/auth.routes";
import commentLikeRoutes from './routes/commentLike.routes';
import fileRoutes from './routes/file.routes';
import hateRoutes from './routes/hate.routes';
import matchRoutes from './routes/match.routes';
import replyCommentRoutes from './routes/replyComment.routes';
import userRoutes from "./routes/user.routes";
import userEloRoutes from './routes/userElo.routes';


dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/user-elo', userEloRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/comment-like', commentLikeRoutes);
app.use('/api/hate', hateRoutes);
app.use('/api/reply-comment', replyCommentRoutes);
app.use('/api/file', fileRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(5000, () => {
            console.log("Server started on port 5000");
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });