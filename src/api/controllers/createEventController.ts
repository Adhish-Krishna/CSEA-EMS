import { Request, Response } from 'express';
import prisma from '../../prisma';

const createEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, about, date, event_type, event_category, min_no_member, max_no_member, club_id, user_id } = req.body;

        // Validate required fields
        if (!name || !about || !date || !event_type || !event_category || min_no_member === undefined || max_no_member === undefined || !club_id || !user_id) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }

        // Ensure min_no_member is not greater than max_no_member
        if (min_no_member > max_no_member) {
            res.status(400).json({ message: "Minimum number of members cannot be greater than maximum." });
            return;
        }

        // Check if the user is an admin of the given club
        const clubAdmin = await prisma.clubmembers.findFirst({
            where: {
                user_id,
                club_id,
                is_admin: true
            }
        });

        if (!clubAdmin) {
            res.status(403).json({ message: "You are not authorized to create an event for this club." });
            return;
        }

        // Create new event
        const newEvent = await prisma.events.create({
            data: {
                name,
                about,
                date: new Date(date), // Ensure date is properly formatted
                event_type,
                event_category,
                min_no_member,
                max_no_member
            }
        });

        // Link event with the club in organizingClubs table
        await prisma.organizingclubs.create({
            data: {
                event_id: newEvent.id,
                club_id
            }
        });

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

export { createEventController };
