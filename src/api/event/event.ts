import { Router} from 'express';

import {RegisterController,updateEventcontroller,putEventAttendance} from './controller.js';
import { adminAuthMiddleware, userAuthMiddleware } from '../../middleware/authMiddleware.js';
const eventRouter = Router();

eventRouter.post('/register', userAuthMiddleware, RegisterController);
eventRouter.post('/update/:eventId',adminAuthMiddleware,updateEventcontroller);
eventRouter.post('/attendance',adminAuthMiddleware,putEventAttendance);


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

/**
 * @swagger
 * /event/update/{eventId}:
 *   post:
 *     tags: [Events]
 *     summary: Update an existing event
 *     description: >
 *       Allows an admin to update the details of an event using its ID.  
 *       - All fields are optional, send only the ones you wish to update.  
 *       - Only authenticated admins are allowed to access this route.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventDto'
 *     responses:
 *       200:
 *         description: Event Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event Updated successfully
 *       500:
 *         description: Failed to update event
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateEventDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "TechX 2025"
 *         about:
 *           type: string
 *           example: "An exciting technical event with multiple challenges."
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-04-20"
 *         event_type:
 *           type: string
 *           example: "Technical"
 *         event_category:
 *           type: string
 *           example: "Hackathon"
 *         min_no_member:
 *           type: integer
 *           example: 1
 *         max_no_member:
 *           type: integer
 *           example: 4
 *         venue:
 *           type: string
 *           example: "Main Auditorium"
 */

export default eventRouter;