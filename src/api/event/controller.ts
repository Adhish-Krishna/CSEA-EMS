import {Request, Response} from 'express'
import prisma from '../../prisma.js';
import { WinnerDetails } from './types.js';
import { UpdateEventDto } from './types.js';


const updateEventcontroller = async (req: Request, res: Response) => {
    const eventId = Number(req.params.id);
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

const AddingWinnerController = async (req: Request, res: Response) => {
    const Winner: WinnerDetails = req.body; 
    const {event_id,team_id,position}= Winner;
    if(!event_id || !team_id || !position){
        res.status(400).json({
            message: "Requires all fields"
        })
        return;
    }
    try{
        const Winnersadded= await prisma.eventwinners.create({
            data:{
                event_id: event_id,
                team_id: team_id,
                position: position
            }
        })
        res.status(201).json({
            message: "Winners added successfully",
            data: Winnersadded
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}
export {updateEventcontroller,AddingWinnerController};