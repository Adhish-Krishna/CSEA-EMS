import { Router } from 'express';
import { 
    acceptTeamInviteController, 
    feedbackController, 
    rejectTeamInviteController,
    fetchMembersController,
    RegisterController,
    fetchInvitations,
} from './controller.js';

const userRouter = Router();
userRouter.post('/register',RegisterController);
userRouter.post('/acceptTeamInvite',acceptTeamInviteController);
userRouter.get('/MembershipDetails',fetchMembersController);
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
 * /acceptTeamInvite:
 *   post:
 *     summary: Accept a team invite
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from_team_id
 *               - to_user_id
 *               - event_id
 *             properties:
 *               from_team_id:
 *                 type: integer
 *                 example: 1
 *               to_user_id:
 *                 type: integer
 *                 example: 42
 *               event_id:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully joined the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully joined the team!
 *       400:
 *         description: Bad request or team full
 *       404:
 *         description: Invite, event, or team not found
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /fetchClubMemberships:
 *   post:
 *     summary: Fetch all clubs a user is a member of
 *     tags: [Club]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 23
 *     responses:
 *       200:
 *         description: Successfully fetched club memberships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetched club members
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Coding Club
 *                       role:
 *                         type: string
 *                         example: President
 *       400:
 *         description: Missing user_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Requires user_id
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /rejectTeamInvite:
 *   post:
 *     summary: Reject a team invitation
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from_team_id
 *               - to_user_id
 *               - event_id
 *             properties:
 *               from_team_id:
 *                 type: integer
 *                 example: 12
 *               to_user_id:
 *                 type: integer
 *                 example: 45
 *               event_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Team invite rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team invite rejected.
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Require all fields
 *       404:
 *         description: Team invite not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Team invite not found
 *       500:
 *         description: Internal server error
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

