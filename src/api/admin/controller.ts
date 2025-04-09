import { Request,Response } from "express";
import prisma from '../../prisma.js';
import { 
    Attendance,
    CreateEventDTO,
    PastEventData,
    PastEventsResponse, 
    PrismaEvent 
} from "./types.js";


const putAttendance = async (req:Request,res:Response) : Promise<void>=>{
    try{
        const attendance : Attendance = req.body;
        if (!attendance.event_id || !attendance.user_id || attendance.is_present === undefined) {
            res.status(400).json({
                message: "Required fields missing: event_id, user_id, and is_present are required"
            });
            return;
        }
        const updatedAttendance = await prisma.teammembers.updateMany({
            where:{
                event_id: attendance.event_id,
                user_id: attendance.user_id
            },
            data:{
                is_present: attendance.is_present
            }
        })

        if (updatedAttendance.count==0){
            res.status(404).json({
                message : "No record found for matching event_id and user_id"
            });
            return;
        }
        res.status(200).json({
            message: "Attendance updated successfully for the given user_id and event_id"
        })
    }catch(error){
        res.status(500).json({
            message : "Internal server error while updating attendance",
            error : error
        });
    }
}

const createEventController = async (req: Request, res: Response): Promise<void> => {
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

const getPastEventsByClubController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { club_id } = req.query;
      console.log("club_id from query:", req.query.club_id);
  
      if (!club_id) {
        res.status(400).json({ message: "Club ID is required." });
        return;
      }
  
      const today = new Date();
  
      const pastEvents = await prisma.events.findMany({
        where: {
          date: {
            lt: today,
          },
          organizingclubs: {
            some: {
              club_id: Number(club_id),
            },
          },
        },
        include: {
          eventconvenors: {
            include: {
              users: {
                select: {
                  name: true,
                  department: true,
                  yearofstudy: true,
                },
              },
            },
          },
          eventwinners: {
            include: {
              teams: {
                select: {
                  name: true,
                },
              },
            },
          },
          feedback: true,
          eventregistration: true,
          teammembers: true,
        },
      }) as PrismaEvent[];
  
      const formattedData: PastEventData[] = pastEvents.map(event => {
        const average_rating = event.feedback.length
          ? event.feedback.reduce((acc: number, f) => acc + (f.rating || 0), 0) / event.feedback.length
          : 0;
  
  
        const eventConvenors = event.eventconvenors.map((ec) => ({
          name: ec.users?.name || null,
          department: ec.users?.department || null,
          yearofstudy: ec.users?.yearofstudy || null,
        }));
  
      
        const eventWinners = event.eventwinners.map((w) => ({
          position: w.position,
          team_name: w.teams?.name || null,
        }));
  
       
        const total_attendance = event.teammembers.filter(member => member.is_present).length;
  
        return {
          name: event.name,
          about: event.about,
          date: event.date,
          event_type: event.event_type,
          event_category: event.event_category,
          eventConvenors,
          eventWinners,
          average_rating: Number(average_rating.toFixed(2)),
          total_registered_teams: event.eventregistration.length,
          total_attendance,
        };
      });
  
      const response: PastEventsResponse = {
        message: "Past events details retrieved successfully.",
        data: formattedData,
      };
  
      res.status(200).json(response);
  
    } catch (error) {
      console.error("Error fetching past events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export  {
    putAttendance,
    createEventController,
    getPastEventsByClubController
};