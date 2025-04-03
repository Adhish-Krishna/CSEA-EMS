import { Router } from 'express';
import { acceptTeamInviteController, rejectTeamInviteController } from './controller.js';

const userRouter = Router();

/**
 * @swagger
 * /user/acceptTeamInvite/{eventId}:
 *   post:
 *     tags: [Users]
 *     summary: Accept a team invite
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInvite'
 *           example:
 *             from_team_id: "team123"
 *             to_team_id: "team456"
 *     responses:
 *       200:
 *         description: Team invite accepted.
 *       400:
 *         description: Missing eventId or required fields in request body.
 *       404:
 *         description: Invite not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/acceptTeamInvite/:eventId', acceptTeamInviteController);

/**
 * @swagger
 * /user/rejectTeamInvite:
 *   post:
 *     tags: [Users]
 *     summary: Reject a team invite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInvite'
 *           example:
 *             from_team_id: "team123"
 *             to_team_id: "team456"
 *     responses:
 *       200:
 *         description: Team invite rejected.
 *       404:
 *         description: Invite not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/rejectTeamInvite', rejectTeamInviteController);

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamInvite:
 *       type: object
 *       required:
 *         - from_team_id
 *         - to_team_id
 *       properties:
 *         from_team_id:
 *           type: string
 *           description: ID of the team sending the invite
 *         to_team_id:
 *           type: string
 *           description: ID of the team receiving the invite
 */

export default userRouter;