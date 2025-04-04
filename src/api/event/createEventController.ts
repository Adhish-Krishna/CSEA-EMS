import { Request, Response } from "express";
import prisma from "../../../prisma.js";
const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, about, date, event_type, event_category, min_no_member, max_no_member, club_id } = req.body;

        if (!name || !date || !event_type || !event_category || !club_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const event = await prisma.events.create({
            data: {
                name,
                about,
                date: new Date(date),
                event_type,
                event_category,
                min_no_member,
                max_no_member,
            },
        });

        await prisma.organizingclubs.create({
            data: {
                event_id: event.id,
                club_id: Number(club_id), // Ensure club_id is a number if required
            },
        });

        return res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default createEvent;