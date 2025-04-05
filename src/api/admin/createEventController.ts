import { Request, Response } from 'express';
import prisma from '../../prisma.js';
import { CreateEventDTO } from './types.js'

export const createEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name,
            about,
            date,
            event_type,
            event_category,
            min_no_member,
            max_no_member,
            club_id,
            user_id
        }: CreateEventDTO = req.body;

        
        if (!name || !date || !event_type || !event_category || !club_id || !user_id) {
            res.status(400).json({ message: "Missing required fields." });
            return;
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
                club_id,
                event_id: event.id,
            },
        });

       
        await prisma.eventconvenors.create({
            data: {
                event_id: event.id,
                user_id,
                club_id,
            },
        });

        res.status(201).json({
            message: "Event created successfully.",
            event,
        });

    } catch(err: any){
        console.error("admin Error:", err);
        res.status(500).json({
            message: err.message || "Something went wrong"
        });
        return;
    }
}