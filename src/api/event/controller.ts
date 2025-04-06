import {Request, Response} from 'express'
import prisma from '../../prisma.js';
import { EventRegistration ,UpdateEventDto} from './types.js';

const RegisterController = async(req : Request,res:Response): Promise<void> =>{
    try{    
        const user_id=req.user_id;
        const event_registration : EventRegistration = req.body; 

        const event = await prisma.events.findUnique({
            where: {
                id:event_registration.event_id
            }
        });

        if (!event) {
            res.status(404).json({message: 'Event not found'});
            return;
        }
        let teamName : string;
        if (event.min_no_member === 1 && event.max_no_member === 1) {
            const user = await prisma.users.findUnique({
                where: {
                    id: user_id
                },
                select: {
                    rollno: true
                }
            });

            if (!user) {
                res.status(404).json({message : 'User not found'});
                return;
            }
            if (user.rollno === null) {
                res.status(400).json({message: 'User roll number is required'});
                return;
            }
            teamName = user.rollno;
        }else{
            teamName = event_registration.teamName;
        }
        const team = await prisma.teams.create({
            data: {
                name : teamName,
                event_id : event_registration.event_id
            }
        });

        const registerTeam = await prisma.eventregistration.create({
            data: {
                event_id: event_registration.event_id,
                team_id: team.id
            }
        });

        const addTeamMember = await prisma.teammembers.create({
            data: {
                user_id:user_id,
                team_id: team.id
            }
        });

        res.status(201).json({
            message : 'Event Registration Successful',
        })
        
        return;
    }catch(error){
        console.error('Error registering for event:', error);
        res.status(500).json({ message: 'Failed to register for event' });
    }
}

const updateEventcontroller = async (req: Request, res: Response) => {
    const eventId = Number(req.params.id); // assuming you're using /events/:id
    const updates: UpdateEventDto = req.body;
  
    try {
      const updatedEvent = await prisma.events.update({
        where: { id: eventId },
        data: updates,
      });
  
      res.status(200).json({message : 'Event Updated successfully'});
    } catch (err) {
      console.error('Error updating event:', err);
      res.status(500).json({ error: 'Failed to update event.' });
    }
  };
export {RegisterController,updateEventcontroller };