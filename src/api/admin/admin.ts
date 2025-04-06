import { Router } from 'express';
import { createEventController } from './createEventController.js'
import { adminAuthMiddleware } from '../../middleware/authMiddleware.js';
import { getPastEventsByClubController } from './getPastEvent.js';


const adminRouter = Router();


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
 *     tags: [Events]
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
 *     tags: [Events]
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

adminRouter.post('/create-event',adminAuthMiddleware,createEventController);
adminRouter.get('/events-history', adminAuthMiddleware,getPastEventsByClubController);


export default adminRouter;
