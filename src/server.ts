import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userAuthRouter from "./api/auth/userAuth/auth.js";
import adminAuthRouter from "./api/auth/adminAuth/auth.js";
import userRouter from "./api/user/user.js";
import { setupSwagger } from "./swagger.js";
import eventRouter from "./api/event/event.js";
import { clearSecurityCodes } from "./jobs/securityCodeCleaner/securityCodeCleaner.js";
import {adminAuthMiddleware, userAuthMiddleware } from "./middleware/authMiddleware.js";
import { createEventController } from "./api/admin/createEventController.js";
import { getPastEventsByClubController } from "./api/admin/getPastEvent.js";
import adminRouter from "./api/admin/admin.js";

dotenv.config();

const PORT = process.env.PORT || 3000;


const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

setupSwagger(app);

clearSecurityCodes();

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Daddy-EMS server is running...",
    });
});

app.use("/auth/user", userAuthRouter);
app.use("/auth/admin", adminAuthRouter);
app.use("/user", userAuthMiddleware, userRouter);
app.use("/admin",adminRouter);
app.use("/event",eventRouter);
app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}`);
});
