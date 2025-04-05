import { Router } from 'express';
import { createEventController } from './createEventController';

const eventRouter = Router();

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
 * /admin/create:
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
 */
eventRouter.post('/create', createEventController);

export default eventRouter;
