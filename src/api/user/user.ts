import { Router } from 'express';
import { 
    acceptTeamInviteController, 
    feedbackController, 
    rejectTeamInviteController,
    FetchMembersController,
    RegisterController,
    fetchInvitations,
} from './controller.js';

const userRouter = Router();
userRouter.post('/register',RegisterController);
userRouter.post('/acceptTeamInvite/:eventId',acceptTeamInviteController);
userRouter.get('/MembershipDetails',FetchMembersController);
userRouter.post('/rejectTeamInvite',rejectTeamInviteController);
userRouter.get('/fetch/invitations',fetchInvitations);
//userRouter.get('/fetch/profile',fetchProfile)
userRouter.post('/feedback',feedbackController);

export default userRouter;

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a user for an event
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventRegistration'
 *     responses:
 *       201:
 *         description: Event Registration Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event Registration Successful"
 *       400:
 *         description: Bad Request - Missing required fields or event not found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to register for event
 *
*/


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


/**
 * @swagger
 * /user/MembershipDetails:
 *   get:
 *     tags: [Users]
 *     summary: Fetch membership details of a user
 *     responses:
 *       200:
 *         description: Membership details fetched successfully.
 *       500:
 *         description: Internal server error.
 */

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

