import { Router } from 'express';
import { 
    acceptTeamInviteController, 
    feedbackController, 
    rejectTeamInviteController,
    fetchMembersController,
    RegisterController,
    fetchInvitations,
    fetchProfile,
    getPastEventsController,
    getOngoingEventsController,
    getUpcomingEventsController
} from './controller.js';


const userRouter = Router();
userRouter.post('/register', RegisterController);
userRouter.post('/acceptTeamInvite', acceptTeamInviteController);
userRouter.get('/membershipDetails', fetchMembersController);
userRouter.post('/rejectTeamInvite', rejectTeamInviteController);
userRouter.get('/fetch/invitations', fetchInvitations);
userRouter.get('/fetch/profile', fetchProfile);
userRouter.post('/feedback', feedbackController);

// Removed '/events' POST route that was using fetchAllEventsController

// Specialized event routes
userRouter.get('/events/past', getPastEventsController);
userRouter.get('/events/ongoing', getOngoingEventsController);
userRouter.get('/events/upcoming', getUpcomingEventsController);

export default userRouter;


/**
 * @swagger
 * /register:
 *   post:
 *     tags: [User]
 *     summary: Register for an event
 *     description: Registers the authenticated user for an event. If the event is a solo event, the team name is automatically set to the user's roll number. Otherwise, the user must provide a team name.
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
 *                   example: Event Registration Successful
 *       400:
 *         description: User roll number is null in database
 *       404:
 *         description: Event or User not found
 *       500:
 *         description: Failed to register for event
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventRegistration:
 *       type: object
 *       required:
 *         - event_id
 *         - teamName
 *       properties:
 *         event_id:
 *           type: integer
 *           description: ID of the event
 *           example: 12
 *         teamName:
 *           type: string
 *           description: Name of the team (ignored for solo events)
 *           example: "Team Debuggers"
 */


/**
 * @swagger
 * /acceptTeamInvite:
 *   post:
 *     tags: [User]
 *     summary: Accept a team invitation
 *     description: Allows a user to accept a team invitation for a specific event. If the user is already in a team, their team will be updated. Invitation will be deleted after acceptance.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInvite'
 *     responses:
 *       200:
 *         description: Team invite accepted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team invite accepted.
 *       400:
 *         description: Required fields missing or team is already full
 *       404:
 *         description: Event, Team, or Invitation not found
 *       500:
 *         description: Internal server error while accepting team invite
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamInvite:
 *       type: object
 *       required:
 *         - from_team_id
 *         - to_user_id
 *         - event_id
 *       properties:
 *         from_team_id:
 *           type: integer
 *           description: ID of the team sending the invite
 *           example: 25
 *         to_user_id:
 *           type: integer
 *           description: ID of the user receiving the invite
 *           example: 105
 *         event_id:
 *           type: integer
 *           description: ID of the event
 *           example: 7
 */



/**
 * @swagger
 * /membershipDetails:
 *   get:
 *     tags: [User]
 *     summary: Get membership details of a user
 *     description: Fetches all the clubs a user is a member of, along with the user's role in each club.
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
 *                 description: ID of the user
 *                 example: 101
 *     responses:
 *       200:
 *         description: Membership details fetched successfully or no clubs found
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
 *                     $ref: '#/components/schemas/MembershipDetails'
 *       400:
 *         description: Requires user_id in the request body
 *       500:
 *         description: Internal server error while fetching membership details
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MembershipDetails:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the club
 *           example: 3
 *         role:
 *           type: string
 *           description: Role of the user in the club (nullable)
 *           example: "President"
 *         name:
 *           type: string
 *           description: Name of the club
 *           example: "Coding Club"
 */

/**
 * @swagger
 * /rejectTeamInvite:
 *   post:
 *     tags: [User]
 *     summary: Reject a team invitation
 *     description: Rejects a team invitation for a specific event by deleting the invitation record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInvite'
 *     responses:
 *       200:
 *         description: Team invite rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team invite rejected.
 *       400:
 *         description: Required fields missing (from_team_id, to_user_id, and event_id)
 *       404:
 *         description: Team invite not found
 *       500:
 *         description: Internal server error while rejecting team invite
 */

/**
 * @swagger
 * /fetch/invitations:
 *   get:
 *     tags: [User]
 *     summary: Fetch all invitations received by the logged-in user
 *     description: Retrieves a list of team invitations sent to the current user, including event name, inviter name, and team name.
 *     responses:
 *       200:
 *         description: Invitations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invitations retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InvitationDetails'
 *       500:
 *         description: Internal server error while fetching invitations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InvitationDetails:
 *       type: object
 *       properties:
 *         event_id:
 *           type: integer
 *           description: ID of the event
 *           example: 5
 *         event_name:
 *           type: string
 *           description: Name of the event
 *           example: Code Carnival
 *         from_user_name:
 *           type: string
 *           description: Name of the user who sent the invitation
 *           example: Alice Johnson
 *         teamName:
 *           type: string
 *           description: Name of the team that sent the invitation
 *           example: Debug Ninjas
 */

/**
 * @swagger
 * /fetch/profile:
 *   get:
 *     tags: [User]
 *     summary: Fetch profile of the logged-in user
 *     description: Retrieves the complete profile of the currently authenticated user.
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile Fetched successfully
 *                 profile:
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Error while fetching user profile
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         rollno:
 *           type: string
 *           example: 22CSR045
 *         department:
 *           type: string
 *           example: CSE - AIML
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         phoneno:
 *           type: integer
 *           example: 9876543210
 *         yearofstudy:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /feedback:
 *   post:
 *     tags: [User]
 *     summary: Submit feedback for an event
 *     description: Allows a user to submit textual feedback and a rating for a specific event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackInput'
 *     responses:
 *       201:
 *         description: Feedback saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Feedback saved successfully
 *       500:
 *         description: Error while saving feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedbackInput:
 *       type: object
 *       required:
 *         - event_id
 *         - feedback
 *         - rating
 *       properties:
 *         event_id:
 *           type: integer
 *           example: 101
 *         feedback:
 *           type: string
 *           example: The event was well organized and engaging.
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 1
 *           maximum: 5
 *           example: 4.5
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 42
 *         name:
 *           type: string
 *           example: Code Carnival
 *         about:
 *           type: string
 *           example: A 24-hour coding competition
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-05-15
 *         venue:
 *           type: string
 *           example: Main Auditorium
 *         event_type:
 *           type: string
 *           example: Technical
 *         event_category:
 *           type: string
 *           example: Team
 *         min_no_member:
 *           type: integer
 *           example: 2
 *         max_no_member:
 *           type: integer
 *           example: 4
 *         club_name:
 *           type: string
 *           example: Coding Club
 *         status:
 *           type: string
 *           enum: [past, ongoing, upcoming]
 *           example: upcoming
 */

/**
 * @swagger
 * /user/events/past:
 *   get:
 *     tags: [User]
 *     summary: Fetch all past events
 *     description: Retrieves all events with dates before the current date, sorted by most recent first.
 *     responses:
 *       200:
 *         description: Past events fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Past events fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EventListItem'
 *       500:
 *         description: Error while fetching past events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching past events
 */

/**
 * @swagger
 * /user/events/ongoing:
 *   get:
 *     tags: [User]
 *     summary: Fetch all ongoing events
 *     description: Retrieves all events happening on the current date, sorted chronologically.
 *     responses:
 *       200:
 *         description: Ongoing events fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ongoing events fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EventListItem'
 *       500:
 *         description: Error while fetching ongoing events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching ongoing events
 */

/**
 * @swagger
 * /user/events/upcoming:
 *   get:
 *     tags: [User]
 *     summary: Fetch all upcoming events
 *     description: Retrieves all events with dates after the current date, sorted chronologically.
 *     responses:
 *       200:
 *         description: Upcoming events fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Upcoming events fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EventListItem'
 *       500:
 *         description: Error while fetching upcoming events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching upcoming events
 */
