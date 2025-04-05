import { Router } from 'express';
import { createEventController } from './createEventController';

const eventRouter = Router();

/**
 * @swagger
 * /events/create:
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
 *             min_no_member: 2
 *             max_no_member: 4
 *             club_id: 1
 *             user_id: 5
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