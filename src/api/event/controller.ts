import {Request, Response} from 'express'
import prisma from '../../prisma.js';
import { WinnerDetails,DeleteWinners,UpdateEventDto } from './types.js';


const updateEventcontroller = async (req: Request, res: Response) : Promise<void>=> {
    const eventId = Number(req.params.id);
    const updates: UpdateEventDto = req.body;
  
    try {
      const updatedEvent = await prisma.events.update({
        where: { id: eventId },
        data: updates,
      });
  
      res.status(201).json({message : 'Event Updated successfully'});
    } catch (err) {
      console.error('Error updating event:', err);
      res.status(500).json({ error: 'Failed to update event.' });
    }
  };

const AddingWinnerController = async (req: Request, res: Response) : Promise<void>=> {
    const Winner: WinnerDetails = req.body; 
    const {event_id,team_id,position}= Winner;
    if(!event_id || !team_id || !position){
        res.status(400).json({
            message: "Requires all fields"
        })
        return;
    }
    try{
        const check = await prisma.eventwinners.count({
            where:{
                team_id:team_id,
                event_id:event_id
            }
        });
        if(check>0){
            res.status(201).json({
                message:"Winners already added"
            });
            return;
        }
        const addedWinners= await prisma.eventwinners.create({
            data:{
                event_id: event_id,
                team_id: team_id,
                position: position
            }
        })
        res.status(201).json({
            message: "Winners added successfully",
            data: addedWinners
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const removeWinnerController = async (req:Request,res:Response) : Promise<void>=>{
    const to_del:DeleteWinners = req.body;
    if (!to_del.event_id || !to_del.position){
        res.status(400).json({
            message:"Missing some request fields"
        })
    }
    try{
        const data = await prisma.eventwinners.fetch({
            where:{
                event_id:to_del.event_id,
                position:to_del.position
            }
        })
        if(!data){
            res.status(400).json({
                message:"The position is already empty"
            })
            return;
        }
        const del = await prisma.eventwinners.delete({
            where:{
                event_id:to_del.event_id,
                position:to_del.position
            }
        });
        res.status(204).json({
            message:"Winners deleted succesfully"
        })

    }catch(err){
        res.status(500).json({
            message:err
        })
    }

}
export {updateEventcontroller,AddingWinnerController,removeWinnerController};