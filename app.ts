import "reflect-metadata";
import * as dotenv from "dotenv";

import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import matchRoutes from './routes/match.routes';


dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/matches', matchRoutes);

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