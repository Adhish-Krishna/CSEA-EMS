import { Router } from 'express';
import { createEventController } from './createEventController.js'
import { adminAuthMiddleware } from '../../middleware/authMiddleware.js';
import { getPastEventsByClubController } from './getPastEvent.js';
import putAttendance from './controller.js';


const adminRouter = Router();
adminRouter.post('/create-event',adminAuthMiddleware,createEventController);
adminRouter.get('/events-history', adminAuthMiddleware,getPastEventsByClubController);
adminRouter.post('/attendance',putAttendance);

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
 *         about:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         event_type:
 *           type: string
 *         event_category:
 *           type: string
 *         venue:
 *           type: string
 *         min_no_member:
 *           type: integer
 *         max_no_member:
 *           type: integer
 *         club_id:
 *           type: integer
 *       required:
 *         - name
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDTO'
 *           example:
 *             name: "Coding Marathon"
 *             about: "A 24-hour coding competition"
 *             date: "2025-04-10"
 *             event_type: "Competition"
 *             event_category: "Tech"
 *             venue: "Main Auditorium"
 *             min_no_member: 2
 *             max_no_member: 4
 *             club_id: 1
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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




export default adminRouter;
