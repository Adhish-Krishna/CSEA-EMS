import express from "express";
import createEvent  from "./createEventController.ts"; // ✅ Correct import

const router = express.Router();

// ✅ Correct usage of the route
router.post("/create", createEvent);

export default router;
