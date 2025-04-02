import { Router } from 'express';
import { acceptTeamInviteController, rejectTeamInviteController } from './controller.js';

const userRouter = Router();

/**
 * @swagger
 * /user/acceptTeamInvite/{eventId}:
 *   post:
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
 *     responses:
 *       200:
 *         description: Team invite accepted.
 *       404:
 *         description: Invite not found.
 */
userRouter.post('/user/acceptTeamInvite/:eventId', acceptTeamInviteController);

/**
 * @swagger
 * /user/rejectTeamInvite:
 *   post:
 *     summary: Reject a team invite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInvite'
 *     responses:
 *       200:
 *         description: Team invite rejected.
 *       404:
 *         description: Invite not found.
 */
userRouter.post('/user/rejectTeamInvite/', rejectTeamInviteController);

export default userRouter;