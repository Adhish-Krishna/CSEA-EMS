import "./tracer.js"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userAuthRouter from "./api/auth/userAuth/auth.js";
import adminAuthRouter from "./api/auth/adminAuth/auth.js";
import globalAuthRouter from "./api/auth/globalAuth/auth.js";
import userRouter from "./api/user/user.js";
import eventRouter from "./api/event/event.js";
import clubRouter from './api/club/club.js';

import logsRouter from "./api/logs/logs.js";
import globalRouter from "./api/global/global.js";
import { setupSwagger } from "./swagger.js";
import { clearSecurityCodes } from "./jobs/securityCodeCleaner/securityCodeCleaner.js";
import {adminAuthMiddleware, userAuthMiddleware, globalAuthMiddleware } from "./middleware/authMiddleware.js";

import adminRouter from "./api/admin/admin.js";
import logger from "./utils/logger.js";
import { requestLogger, errorLogger } from "./middleware/loggerMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

setupSwagger(app);

clearSecurityCodes();


app.get("/", (req: Request, res: Response) => {
    logger.info("Root endpoint accessed");
    res.json({
        message: "Daddy-EMS server is running...",
    });
});

app.use("/auth/user", userAuthRouter);
app.use("/auth/admin", adminAuthRouter);
app.use("/auth/global", globalAuthRouter);
app.use("/user", userAuthMiddleware, userRouter);
app.use("/event", adminAuthMiddleware, eventRouter);
app.use("/logs",adminAuthMiddleware,logsRouter);
app.use("/admin", adminAuthMiddleware,adminRouter);
app.use("/global", globalAuthMiddleware ,globalRouter);
app.use("/club", clubRouter);

app.use(errorLogger);


app.use((err: any, req: Request, res: Response, next: any) => {
    logger.error(`Unhandled error: ${err.message}`, {
        stack: err.stack,
        path: req.path
    });
    res.status(500).json({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
});

app.listen(PORT, () => {
    logger.info(`Server running on : http://localhost:${PORT}`);
});