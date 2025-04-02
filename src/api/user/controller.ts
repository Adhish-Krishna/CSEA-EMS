import {Request, Response} from 'express'
import prisma from '../../prisma.js';
// Updated import: get the common register service.
import RegisterController  from '../event/controller.js';
import {TeamInvite} from './types.js';

const acceptTeamInviteController = async (req: Request, res: Response): Promise<void> =>{
    const user_id=req.user_id;
    const eventId = req.params.eventId;
    const Invite: TeamInvite = req.body;
    const {from_team_id,to_team_id} = Invite;
    try{
        const teamInvite = await prisma.invitation.findFirst({
            where: {
                from_team_id: from_team_id,
                to_team_id: to_team_id
            }
        });
        if (!teamInvite) {
            res.status(404).json({error: 'Team invite not found'});
            return;
        }
        const updatedTeamMember = await prisma.teammembers.updateMany({
            where:{
                user_id: user_id,
                team_id: to_team_id
            },
            data:{
                team_id: from_team_id,
            }
        });
        if (updatedTeamMember.count === 0) {
            await RegisterController(req, res);
        }
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

export default acceptTeamInviteController;