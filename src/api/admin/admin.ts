import { Router } from 'express';
import {
    putAttendance,
    createEventController,
    getPastEventsByClubController,
    fetchProfile
} from './controller.js';


const adminRouter = Router();
adminRouter.post('/create-event',createEventController);
adminRouter.get('/events-history', getPastEventsByClubController);
adminRouter.post('/attendance',putAttendance);
adminRouter.get('/profile', fetchProfile);

/**
 * @swagger
 * /admin/attendance:
 *   post:
 *     tags: [Admin]
 *     summary: Update attendance for a user in an event
 *     description: Updates the attendance status (`is_present`) of a specific user for a given event. Requires `event_id`, `user_id`, and `is_present` fields in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceUpdateDTO'
 *     responses:
 *       200:
 *         description: Attendance updated successfully for the given user_id and event_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance updated successfully for the given user_id and event_id
 *       400:
 *         description: Required fields missing (event_id, user_id, and is_present)
 *       404:
 *         description: No matching record found for the given event_id and user_id
 *       500:
 *         description: Internal server error while updating attendance
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AttendanceUpdateDTO:
 *       type: object
 *       required:
 *         - event_id
 *         - user_id
 *         - is_present
 *       properties:
 *         event_id:
 *           type: integer
 *           description: ID of the event
 *           example: 7
 *         user_id:
 *           type: integer
 *           description: ID of the user
 *           example: 103
 *         is_present:
 *           type: boolean
 *           description: Attendance status of the user
 *           example: true
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEventDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event
 *           example: "Coding Marathon"
 *         about:
 *           type: string
 *           description: Description of the event
 *           example: "A 24-hour coding competition"
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the event (YYYY-MM-DD)
 *           example: "2025-05-15"
 *         event_type:
 *           type: string
 *           description: Type of event (e.g., Competition, Workshop)
 *           example: "Competition"
 *         event_category:
 *           type: string
 *           description: Category of the event (e.g., Technical, Cultural)
 *           example: "Technical"
 *         venue:
 *           type: string
 *           description: Location where the event will be held
 *           example: "Main Auditorium"
 *         min_no_member:
 *           type: integer
 *           description: Minimum number of members allowed per team
 *           example: 2
 *         max_no_member:
 *           type: integer
 *           description: Maximum number of members allowed per team
 *           example: 4
 *         club_id:
 *           type: integer
 *           description: ID of the club organizing the event
 *           example: 1
 *         chief_guest:
 *           type: string
 *           description: Name of the chief guest for the event (optional)
 *           example: "Dr. Jane Smith"
 *         exp_expense:
 *           type: number
 *           format: decimal
 *           description: Expected expenses for the event (optional)
 *           example: 25000.00
 *         tot_amt_allot_su:
 *           type: number
 *           format: decimal
 *           description: Total amount allocated by student union (optional)
 *           example: 15000.00
 *         tot_amt_spt_dor:
 *           type: number
 *           format: decimal
 *           description: Total amount supported by department of reputation (optional)
 *           example: 10000.00
 *         exp_no_aud:
 *           type: integer
 *           description: Expected number of audience (optional)
 *           example: 200
 *         faculty_obs_desig:
 *           type: string
 *           description: Faculty observer designation (optional)
 *           example: "Assistant Professor"
 *         faculty_obs_dept:
 *           type: string
 *           description: Faculty observer department (optional)
 *           example: "Computer Science"
 *         poster:
 *           type: string
 *           format: binary
 *           description: Event poster image (optional)
 *       required:
 *         - name
 *         - about
 *         - date
 *         - event_type
 *         - event_category
 *         - min_no_member
 *         - max_no_member
 *         - venue
 *         - club_id
 *
 */

/**
 * @swagger
 * /admin/create-event:
 *   post:
 *     tags: [Admin]
 *     summary: Create a new event by a club admin
 *     description: Creates a new event with all available fields including optional ones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDTO'
 *           example:
 *             name: "Coding Marathon"
 *             about: "A 24-hour coding competition"
 *             date: "2025-05-15"
 *             event_type: "Competition"
 *             event_category: "Technical"
 *             venue: "Main Auditorium"
 *             min_no_member: 2
 *             max_no_member: 4
 *             club_id: 1
 *             chief_guest: "Dr. Jane Smith"
 *             exp_expense: 25000.00
 *             tot_amt_allot_su: 15000.00
 *             tot_amt_spt_dor: 10000.00
 *             exp_no_aud: 200
 *             faculty_obs_desig: "Assistant Professor"
 *             faculty_obs_dept: "Computer Science"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event created successfully."
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields."
 *       409:
 *         description: Event already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event already exists with the same name, date, and venue."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong."
 *
 */

/**
 * @swagger
 * /admin/events-history:
 *   get:
 *     tags: [Admin]
 *     summary: Get past events for a specific club
 *     description: Fetches events that have already occurred for a given club ID.
 *     parameters:
 *       - in: query
 *         name: club_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the club to fetch past events for
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       about:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date
 *                       venue:
 *                         type: string
 *                       event_type:
 *                         type: string
 *                       event_category:
 *                         type: string
 *                       eventConvenors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             department:
 *                               type: string
 *                             yearofstudy:
 *                               type: string
 *                       eventWinners:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             position:
 *                               type: string
 *                             team_name:
 *                               type: string
 *                       average_rating:
 *                         type: number
 *                       total_feedbacks:
 *                         type: integer
 *                       total_registered_teams:
 *                         type: integer
 *                       total_attendance:
 *                         type: integer
 *       400:
 *         description: Missing required fields (club_id not provided)
 *       401:
 *         description: Unauthorized (admin access token missing or invalid)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     tags: [Admin]
 *     summary: Fetch admin profile information
 *     description: Retrieves the authenticated admin's profile information including name, roll number, and club
 *     responses:
 *       200:
 *         description: Admin profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin profile fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     rollno:
 *                       type: string
 *                       example: B220001CS
 *                     club:
 *                       type: string
 *                       example: Computer Science Engineers Association
 *       301:
 *         description: Admin or Club data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin or Club data not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */



export default adminRouter;
