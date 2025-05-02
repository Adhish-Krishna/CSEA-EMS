import {Request, Response} from 'express'
import prisma from '../../prisma.js';
import { WinnerDetails,DeleteWinners,UpdateEventDto, RegistrationData } from './types.js';
import fs from 'fs-extra';
import path from 'path';

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
        const data = await prisma.eventwinners.findFirst({
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
        const del = await prisma.eventwinners.deleteMany({
            where:{
                event_id:to_del.event_id,
                position:to_del.position
            }
        });
        res.status(200).json({
            message:"Winners deleted succesfully"
        })

    }catch(err){
        res.status(500).json({
            message:err
        })
    }

}

const getEventDetails = async (req: Request, res: Response): Promise<void> =>{
    try{
        const id: number = parseInt(<any>req.query.id);
        const eventRecord = await prisma.events.findFirst({
            where:{
                id: id
            }
        });
        if(!eventRecord){
            res.status(301).json({
                message: "Event not found"
            });
            return;
        }
        else{
            const convernorDetails = await prisma.eventconvenors.findMany({
                where:{
                    event_id: id
                },
                include:{
                    users: true
                }
            });
            const convenor: String[] = [];
            convernorDetails.map((c)=>{
                convenor.push(c.users.rollno!);
            });
            res.status(200).json({ message:"Fetched Event detials successfully",data:{
                name: eventRecord.name,
                date: eventRecord.date,
                venue: eventRecord.venue,
                event_type: eventRecord.event_type,
                event_category: eventRecord.event_category,
                about: eventRecord.about,
                chief_guest: eventRecord.chief_guest,
                tot_amt_allot_su: eventRecord.tot_amt_allot_su,
                tot_amt_spt_dor: eventRecord.tot_amt_spt_dor,
                exp_expense: eventRecord.exp_expense,
                epx_no_aud: eventRecord.exp_no_aud,
                faculty_obs_dept: eventRecord.faculty_obs_dept,
                faculty_obs_desig: eventRecord.faculty_obs_desig,
                min_no_member: eventRecord.min_no_member,
                max_no_member: eventRecord.max_no_member,
                eventConvenors: convernorDetails?convenor:[],
                poster: null
        }});
            return;
        }
    }catch(err){
        res.status(500).json({
            message: "Issue in fetching event details"
        });
        return;
    }
}

const getEventPoster = async (req: Request, res: Response): Promise<void> =>{
    try{
        const id: number = parseInt(<any>req.query.id);
        const event = await prisma.events.findFirst({
            where:{
                id: id
            },
            select:{
                poster: true
            }
        });

        if(!event){
            res.status(404).json({
                message: "Event not found"
            });
            return;
        }

        if(!event.poster){
            res.status(404).json({
                message: "No poster available for this event"
            });
            return;
        }
        const posterPath = path.resolve(event.poster);
        if (await fs.pathExists(posterPath)) {
            const image = await fs.readFile(posterPath);
            let contentType = 'image/png';
            if (posterPath.endsWith('.jpg') || posterPath.endsWith('.jpeg')) {
                contentType = 'image/jpeg';
            }
            res.status(200)
              .setHeader('Content-Type', contentType)
              .send(image);
        } else {
            res.status(404).json({
                message: "Poster file not found on server"
            });
        }
        return;
    }catch(err){
        console.error("Error fetching event poster:", err);
        res.status(500).json({
            message: "Issue in fetching event poster"
        });
        return;
    }
}

const getAllRegistrations = async (req: Request, res: Response): Promise<void> =>{
    try{
        const eventId = parseInt(<any>req.query.id);
        if(isNaN(eventId)){
            res.status(400).json({
                message: "Invalid Event Id"
            });
            return;
        }
        const registrations = await prisma.eventregistration.findMany({
            where: {
              event_id: eventId,
            },
            include: {
              teams: {
                include: {
                  teammembers: {
                    select: {
                      is_present: true,
                      users: {
                        select: {
                          name: true,
                          rollno: true,
                          department: true,
                          yearofstudy: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });
        if(registrations.length == 0){
            res.status(301).json({
                message: "No registrations for this event"
            });
            return;
        }
        const filteredRegistrationsData: RegistrationData[] = []
        registrations.map((registration)=>{
            filteredRegistrationsData.push(
                {
                    team_id: registration.team_id,
                    team_name: registration.teams.name,
                    members: registration.teams.teammembers.map((teammember)=>(
                        { ...teammember.users , is_present: teammember.is_present, }
                    ))
                }
            )
        });
        res.status(200).json({
            message: "Fetched event registrations",
            data: filteredRegistrationsData
        });
        return;
    }catch(err){
        res.status(500).json({
            message: "Issue in fetching event registrations"
        });
        return;
    }
}

const getFeedback = async(req:Request,res:Response) => {
    try {
        const {event_id} = req.params;  
        const event = await prisma.events.findUnique({
            where:{ id : Number(event_id) }
        })
        if(!event) { res.status(404).json({message:`Event with ${event_id} is not Found`});return; }
        const rawfeedback = await prisma.feedback.findMany({
            where:{event_id : Number(event_id)},
            include:{
                users: true 
            }
        })
        
        const feedbacks = rawfeedback.map(feedback => ({
            ...feedback,
            users: {
              ...feedback.users,
              password: undefined,
              phoneno:undefined
            },
          }));
        res.status(200).json({message:"Fetched feedback successfully",data:feedbacks})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error While fetching Feedback"})
    }
}

const getWinners = async(req:Request,res:Response) => {
    try {
        const {event_id} = req.params;
        const event = await prisma.events.findUnique({
            where:{ id : Number(event_id) }
        })
        if(!event) { res.status(404).json({message:`Event with ${event_id} is not Found`});return; }
        const Winners = await prisma.eventwinners.findMany({
            where: { event_id : Number(event_id) },
            include: { 
                teams : { include : { teammembers : { include : {
                    users : { select : {
                        id : true,name:true,email:true,
                        rollno: true,department:true,
                        yearofstudy: true
                    } }
                } } } } 
            }
        })
        
        res.status(200).json({message:"Winner fetched Successfully",data:Winners})
        
    } catch (error) {
        res.status(500).json({message:"Winner fetched failed"})
    }
}

export {updateEventcontroller,AddingWinnerController,removeWinnerController, getEventDetails, getEventPoster, getAllRegistrations,
    getFeedback,getWinners
};