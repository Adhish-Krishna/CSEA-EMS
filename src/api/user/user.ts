import { Router } from 'express';
import { acceptTeamInviteController, feedbackController, rejectTeamInviteController } from './controller.js';

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
 * /user/feedback:
 *   post:
 *     tags: [Users]
 *     summary: Submit user feedback for an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *           example:
 *             event_id: 2
 *             feedback: "Great event, really enjoyed it!"
 *             rating: 5
 *
 *     responses:
 *       201:
 *         description: User feedback saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feedback saved successfully"
 *
 *
 *       500:
 *         description: Internal server error.
 */

userRouter.post('/feedback', feedbackController);

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


/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - event_id
 *         - feedback
 *         - rating
 *       properties:
 *         event_id:
 *           type: number
 *           description: ID of the event being rated
 *         feedback:
 *           type: string
 *           description: User's text feedback about the event
 *         rating:
 *           type: number
 *           description: Numerical rating for the event
 *           minimum: 1
 *           maximum: 5
 */

export default userRouter;