import { Router} from 'express';

import {updateEventcontroller,AddingWinnerController,removeWinnerController} from './controller.js';
const eventRouter = Router();


eventRouter.put('/:id',updateEventcontroller);
eventRouter.post('/addWinners',AddingWinnerController);
eventRouter.post('/removeWinners',removeWinnerController);
export default eventRouter;


/**
 * @swagger
 * /addWinners:
 *   post:
 *     summary: Add a winning team for an event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - team_id
 *               - position
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 5
 *               team_id:
 *                 type: integer
 *                 example: 3
 *               position:
 *                 type: integer
 *                 description: Position secured (e.g. 1 for first place)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Winners added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Winners added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     event_id:
 *                       type: integer
 *                     team_id:
 *                       type: integer
 *                     position:
 *                       type: integer
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Requires all fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /removeWinner:
 *   post:
 *     summary: Remove a winner from a specific position in an event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - position
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 5
 *               position:
 *                 type: integer
 *                 description: Position to remove (e.g. 1 for first place)
 *                 example: 1
 *     responses:
 *       204:
 *         description: Winner deleted successfully
 *       400:
 *         description: Missing some request fields or position already empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The position is already empty
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /updateEvent/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hackathon 2025
 *               about:
 *                 type: string
 *                 example: A national-level 24-hour hackathon.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-15T09:00:00Z
 *               event_type:
 *                 type: string
 *                 example: Technical
 *               event_category:
 *                 type: string
 *                 example: Team
 *               min_no_member:
 *                 type: integer
 *                 example: 2
 *               max_no_member:
 *                 type: integer
 *                 example: 5
 *               venue:
 *                 type: string
 *                 example: Main Auditorium
 *     responses:
 *       201:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event Updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to update event
 */
