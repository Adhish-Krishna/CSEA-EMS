import { Router} from 'express';

import {RegisterController,updateEventcontroller} from './controller.js';
import { adminAuthMiddleware, userAuthMiddleware } from '../../middleware/authMiddleware.js';
const eventRouter = Router();

/**
 * @swagger
 * /event/register:
 *   post:
 *     tags: [Events]
 *     summary: Register a user for an event
 *     description: >
 *       Registers the authenticated user for a specified event.  
 *       - If the event is a solo event (min and max members = 1), the team name is automatically set to the user's roll number.  
 *       - In such cases, send `teamName: ""` in the request body.  
 *       - The user must be authenticated.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 5
 *                 description: ID of the event to register for
 *               teamName:
 *                 type: string
 *                 example: "Byte Busters"
 *                 description: Team name for the event. Leave empty string ("") if it’s a solo event.
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
 *         description: Bad Request (e.g. missing roll number for solo event)
 *       404:
 *         description: Event or User not found
 *       500:
 *         description: Internal Server Error
 */

eventRouter.post('/register', userAuthMiddleware, RegisterController);

eventRouter.post('/update/:eventId',adminAuthMiddleware,updateEventcontroller);

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
 *           description: ID of the event to register for
 *           example: 101
 *         teamName:
 *           type: string
 *           description: Name of the team. Leave as an empty string ("") if the event is a solo event.
 *           example: "Code Ninjas"
 */


export default eventRouter;