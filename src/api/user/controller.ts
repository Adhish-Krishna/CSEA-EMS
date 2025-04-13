import {Request, Response} from 'express'
import prisma from '../../prisma.js';
import {Feedback, TeamInvite, EventRegistration, ClubMember, Club, MembershipDetails, Invite, EventListItem, EventsResponse} from './types.js';

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
                res.status(400).json({message: 'User roll number is null in database'});
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
                team_id: team.id,
                event_id: event_registration.event_id,
                is_present : false
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

const acceptTeamInviteController = async (req: Request, res: Response): Promise<void> =>{
    const user_id=req.user_id;
    const Invite: TeamInvite = req.body;
    try{
        if(!Invite.from_team_id || !Invite.to_user_id || !Invite.event_id){
            res.status(400).json({
                message: "Require all fields"
            })
            return;
        }
        const {from_team_id,to_user_id,event_id} = Invite;
        const max_no_member = await prisma.events.findUnique({
            where:{
                id:event_id
            },
            select:{
                max_no_member:true
            }
        });
        if (!max_no_member) {
            res.status(404).json({message: 'Event not found'});
            return;
        }
        const currentMembers = await prisma.teammembers.count({
            where:{
                team_id:from_team_id,
                event_id:event_id
            }
        });
        if (!currentMembers){
            res.status(404).json({message: 'Team not found'});
            return;
        }
        const teamInvite = await prisma.invitation.findFirst({
            where: {
                from_team_id: from_team_id,
                to_user_id: to_user_id,
                event_id: event_id
            }
        });
        if (!teamInvite) {
            res.status(404).json({error: 'Team invite not found'});
            return;
        }

        if (currentMembers == max_no_member?.max_no_member) {
            res.status(400).json({
                message: "Team is already full"
            })
            return;
        }

        const to_team_id = await prisma.teammembers.findFirst({
            where:{
                user_id:to_user_id,
                event_id:event_id
            },
            select:{
                team_id:true
            }
        });
        if (!to_team_id) {
            const addTeamMember = await prisma.teammembers.create({
                data:{
                    user_id:user_id,
                    team_id:from_team_id,
                    event_id:event_id,
                    is_present:false
                }
            })
        }
        else{
            const updateteamMember = await prisma.teammembers.updateMany({
                where:{
                    user_id:to_user_id,
                    team_id:to_team_id?.team_id,
                    event_id:event_id
                },
                data:{
                    team_id:from_team_id
                }
            });
        }
        const inviteDeleted = await prisma.invitation.delete({
            where:{
                id: teamInvite.id
            }
        });
        res.status(200).json({
            message:"Team invite accepted."
        });
    } catch(err) {
        res.status(500).json({
            message: err
        });
        return;
    }
};

const rejectTeamInviteController = async (req: Request ,res:Response) :Promise<void>=>{
    const user_id=req.user_id;
    const Invite: TeamInvite = req.body;
    if(!Invite.from_team_id || !Invite.to_user_id || !Invite.event_id){
        res.status(400).json({
            message: "Require all fields"
        })
        return;
    }
    const {from_team_id,to_user_id,event_id} = Invite;
    try{
        const teamInvite = await prisma.invitation.findFirst({
            where: {
                from_team_id: from_team_id,
                to_user_id: to_user_id,
                event_id: event_id
            }
        });
        if(!teamInvite){
            res.status(404).json({error: 'Team invite not found'});
            return;
        }
        const inviteDeleted = await prisma.invitation.delete({
            where:{
                id: teamInvite.id
            }
        });
        res.status(200).json({
            message:"Team invite rejected."
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const feedbackController = async (req: Request, res: Response): Promise<void> =>{
    try{
        const userFeedback: Feedback = req.body;
        const user_id = req.user_id;
        const feedbackdata = await prisma.feedback.create({
            data:{
                user_id: user_id,
                event_id: userFeedback.event_id,
                feedback: userFeedback.feedback,
                rating: userFeedback.rating,
            }
        });
        res.status(201).json({
            message: "Feedback saved successfully"
        });
        return;
    }
    catch(err){
        res.status(500).json({
            message: err
        });
        return;
    }
}


const fetchMembersController =async (req:Request,res:Response):Promise<void>=>{
    const user_id=req.body.user_id;
    if(!user_id){
        res.status(400).json({
            message: "Requires user_id"
        })
        return;
    }
    try{
        const clubs:ClubMember[]= await prisma.clubmembers.findMany({
            where:{
                user_id:user_id
            },
            select:{
                club_id:true,
                role:true
            }
        })
        if(!clubs || clubs.length===0){
            res.status(200).json({
                message:"No clubs found for the user"
            });
            return;
        }
        const clubIds=clubs.map((club)=>club.club_id);
        const name: Club[] =await prisma.clubs.findMany({
            where:{
                id:{
                    in:clubIds
                }
            },
            select:{
                name:true,
                id:true
            }
        });
        const Details: MembershipDetails[] = clubs.reduce((acc, club) => {
            const clubDetails = name.find((clubName) => clubName.id === club.club_id);
            if (clubDetails) {
                acc.push({
                    id: club.club_id,
                    role: club.role,
                    name: clubDetails.name
                });
            }
            return acc;
        }, [] as MembershipDetails[]);
        res.status(200).json({
            message:"Fetched club members",
            data: Details
        })
        return;
    }catch(err){
        res.status(500).json({
            message: err
        });
        return;
    }
}

const fetchInvitations = async (req:Request,res:Response) : Promise<void>=>{
    try{
        const user_id = req.user_id;
        const invitations: Invite[] = await prisma.invitation.findMany({
            where:{
                to_user_id:user_id
            },
            select:{
                event_id:true,
                from_user_id:true,
                from_team_id:true,
            }
        })
        if(!invitations){
            res.status(200).json({message:"No Invitations found for the user"});
            return;
        }
        const invitationsWithTeamNames = await Promise.all(invitations.map(async (invitation) => {
            const team = await prisma.teams.findFirst({
                where: {
                    id: invitation.from_team_id
                },
                select: {
                    name: true,
                }
            });
            const user = await prisma.users.findUnique({
                where:{
                    id: invitation.from_user_id
                },
                select:{
                    name:true,
                }
            })
            const eventName = await prisma.events.findUnique({
                where:{
                    id:invitation.event_id
                },
                select:{
                    name:true
                }
            })
            return {
                event_id: invitation.event_id,
                event_name : eventName?.name || 'Unknown Event Name',
                from_user_name: user?.name || 'Unknown User',
                teamName: team?.name || 'Unknown team'
            };
        }));
        
        res.status(200).json({
            message: "Invitations retrieved successfully",
            data: invitationsWithTeamNames
        });
        return;
    }catch(error){
        res.status(500).json({
            message:"Error while fetching Invitations",
            error: error
        });
    }
}

const fetchProfile = async (req:Request,res:Response) : Promise<void>=>{
    try{
        const user_id = req.user_id;
        const profile = await prisma.users.findUnique({
            where:{
                id:user_id
            },
            select:{
                name : true,
                rollno:true,
                department:true,
                email:true,
                phoneno:true,
                yearofstudy:true
            }
        })
        if (!profile){
            res.status(404).json({message:"User not found"});
            return;
        }
        const serializedProfile = JSON.parse(JSON.stringify(profile, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
        ));
        
        res.status(200).json({
            message: "User profile fetched successfully",
            profile: serializedProfile
        });
        return;
    }catch(error){
        res.status(500).json({
            message : "Error while fetching user profile",
            error: error
        })
        return;
    }
}


const getPastEventsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const today = new Date();
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        
        const events = await prisma.events.findMany({
            where: {
                date: {
                    lt: todayOnly
                }
            },
            include: {
                organizingclubs: {
                    include: {
                        clubs: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

       
        const pastEvents: EventListItem[] = events
            .filter(event => event.date !== null)
            .map(event => {
                // Get club name
                const clubName = event.organizingclubs[0]?.clubs?.name || null;
                
                return {
                    id: event.id,
                    name: event.name,
                    about: event.about,
                    date: event.date,
                    venue: event.venue,
                    event_type: event.event_type,
                    event_category: event.event_category,
                    min_no_member: event.min_no_member,
                    max_no_member: event.max_no_member,
                    club_name: clubName,
                    status: 'past'
                };
            });

      
        pastEvents.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

        res.status(200).json({
            message: "Past events fetched successfully",
            data: pastEvents
        });
        return;
    } catch (error) {
        console.error('Error fetching past events:', error);
        res.status(500).json({
            message: "Error fetching past events",
            error: error
        });
        return;
    }
};


const getOngoingEventsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const today = new Date();
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const tomorrowOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        
        // Query specifically for today's events (optimization)
        const events = await prisma.events.findMany({
            where: {
                date: {
                    gte: todayOnly,
                    lt: tomorrowOnly
                }
            },
            include: {
                organizingclubs: {
                    include: {
                        clubs: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

       
        const ongoingEvents: EventListItem[] = events
            .filter(event => event.date !== null)
            .map(event => {
               
                const clubName = event.organizingclubs[0]?.clubs?.name || null;
                
                return {
                    id: event.id,
                    name: event.name,
                    about: event.about,
                    date: event.date,
                    venue: event.venue,
                    event_type: event.event_type,
                    event_category: event.event_category,
                    min_no_member: event.min_no_member,
                    max_no_member: event.max_no_member,
                    club_name: clubName,
                    status: 'ongoing'
                };
            });

    
        ongoingEvents.sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));

        res.status(200).json({
            message: "Ongoing events fetched successfully",
            data: ongoingEvents
        });
        return;
    } catch (error) {
        console.error('Error fetching ongoing events:', error);
        res.status(500).json({
            message: "Error fetching ongoing events",
            error: error
        });
        return;
    }
};


const getUpcomingEventsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const today = new Date();
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const tomorrowOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        
        const events = await prisma.events.findMany({
            where: {
                date: {
                    gte: tomorrowOnly
                }
            },
            include: {
                organizingclubs: {
                    include: {
                        clubs: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

       
        const upcomingEvents: EventListItem[] = events
            .filter(event => event.date !== null)
            .map(event => {
              
                const clubName = event.organizingclubs[0]?.clubs?.name || null;
                
                return {
                    id: event.id,
                    name: event.name,
                    about: event.about,
                    date: event.date,
                    venue: event.venue,
                    event_type: event.event_type,
                    event_category: event.event_category,
                    min_no_member: event.min_no_member,
                    max_no_member: event.max_no_member,
                    club_name: clubName,
                    status: 'upcoming'
                };
            });

        // Sort upcoming events by date (chronologically)
        upcomingEvents.sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));

        res.status(200).json({
            message: "Upcoming events fetched successfully",
            data: upcomingEvents
        });
        return;
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        res.status(500).json({
            message: "Error fetching upcoming events",
            error: error
        });
        return;
    }
};

export {
    RegisterController,
    fetchMembersController,
    acceptTeamInviteController, 
    rejectTeamInviteController, 
    feedbackController,
    fetchInvitations,
    fetchProfile,
    getPastEventsController,
    getOngoingEventsController,
    getUpcomingEventsController
};