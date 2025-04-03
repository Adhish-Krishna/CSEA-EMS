import { Router } from "express";
import { createEventController } from "../controllers/createEventController"; // Adjusted the relative path to match the correct location

const router = Router();

router.post("/create-event", createEventController);

export default router;
