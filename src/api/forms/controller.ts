import { Request, Response } from 'express';
import prisma from '../../prisma.js';

// DTO for request body
interface RegisterTeamRequest {
    teamname: string;
    player1name: string;
    player2name: string;
    player3name: string;
    player1rollno: string;
    player2rollno: string;
    player3rollno: string;
    player1phnno: number;
    player2phnno: number;
    player3phnno: number;
    eventid: number;
}

const registerTeamWithPlayersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            teamname,
            player1name,
            player2name,
            player3name,
            player1rollno,
            player2rollno,
            player3rollno,
            player1phnno,
            player2phnno,
            player3phnno,
            eventid
        } = req.body as RegisterTeamRequest;

        // Validate required fields
        if (
            !teamname ||
            !player1name || !player2name || !player3name ||
            !player1rollno || !player2rollno || !player3rollno ||
            !eventid || !player1phnno || !player2phnno || !player3phnno
        ) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }

        // Prepare player data
        const players = [
            { name: player1name, rollno: player1rollno ,phnno: player1phnno},
            { name: player2name, rollno: player2rollno ,phnno: player2phnno},
            { name: player3name, rollno: player3rollno ,phnno: player3phnno}
        ];

        // Step 1: Ensure all users exist, create if not
        const userIds: number[] = [];
        for (const player of players) {
            let user = await prisma.users.findUnique({
                where: { rollno: player.rollno }
            });

            if (!user) {
                const randomPhone = Math.floor(1000000000 + Math.random() * 9000000000);
                user = await prisma.users.create({
                    data: {
                        name: player.name,
                        rollno: player.rollno,
                        department: "Unknown",
                        email: `${player.rollno}@psgtech.ac.com`,
                        phoneno: player.phnno,
                        yearofstudy: 3
                    }
                });
            }
            userIds.push(user.id);
        }

        // Step 2: Check if any user is already registered for this event
        const alreadyRegistered = await prisma.teammembers.findMany({
            where: {
                event_id: eventid,
                user_id: { in: userIds }
            }
        });

        if (alreadyRegistered.length > 0) {
            const registeredRollnos = await Promise.all(
                alreadyRegistered.map(async tm => {
                    const user = await prisma.users.findUnique({ where: { id: tm.user_id } });
                    return user?.rollno;
                })
            );
            res.status(409).json({
                message: "One or more players have already registered for this event.",
                registered: registeredRollnos
            });
            return;
        }

        // Step 3: Create team
        const team = await prisma.teams.create({
            data: {
                name: teamname,
                event_id: eventid
            }
        });

        // Step 4: Register team for event
        await prisma.eventregistration.create({
            data: {
                event_id: eventid,
                team_id: team.id
            }
        });

        // Step 5: Add all players to teammembers
        for (const userId of userIds) {
            await prisma.teammembers.create({
                data: {
                    user_id: userId,
                    team_id: team.id,
                    event_id: eventid,
                    is_present: false
                }
            });
        }

        res.status(201).json({
            message: "Team and players registered successfully.",
            team_id: team.id,
            player_ids: userIds
        });

    } catch (error) {
        console.error("Error registering team and players:", error);
        res.status(500).json({ message: "Failed to register team and players.", error });
    }
};

export  {
    registerTeamWithPlayersController
};