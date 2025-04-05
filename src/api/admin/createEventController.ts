import { Request, Response } from 'express';
import prisma from '../../prisma.js';
import { CreateEventDTO } from './types.js';

export const createEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const EventDetails: CreateEventDTO = req.body;

        if (
            !EventDetails.name ||
            !EventDetails.date ||
            !EventDetails.event_type ||
            !EventDetails.event_category ||
            !EventDetails.min_no_member ||
            !EventDetails.max_no_member ||
            !EventDetails.club_id ||
            !EventDetails.venue
        ) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }

        // Check for duplicate event (by name + date + venue)
        const existingEvent = await prisma.events.findFirst({
            where: {
                name: EventDetails.name,
                date: new Date(EventDetails.date),
                venue: EventDetails.venue,
            },
        });

        if (existingEvent) {
            res.status(409).json({ message: "Event already exists with the same name, date, and venue." });
            return;
        }

       
        const event = await prisma.events.create({
            data: {
                name: EventDetails.name,
                about: EventDetails.about,
                date: new Date(EventDetails.date),
                event_type: EventDetails.event_type,
                venue: EventDetails.venue,
                event_category: EventDetails.event_category,
                min_no_member: EventDetails.min_no_member,
                max_no_member: EventDetails.max_no_member,
            },
        });

        // Link event with organizing club
        await prisma.organizingclubs.create({
            data: {
                club_id: EventDetails.club_id,
                event_id: event.id,
            },
        });

        res.status(201).json({
            message: "Event created successfully.",
        });

    } catch (err: any) {
        console.error("Event creation error:", err);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};
