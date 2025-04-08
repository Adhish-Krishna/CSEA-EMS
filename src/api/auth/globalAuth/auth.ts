import { Router } from "express";
import { getNewAccessTokenController, loginController, logoutController, signupController } from "./controller.js";

const globalAuthRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginGlobalAdmin:
 *       type: object
 *       required:
 *         - rollno
 *         - password
 *       properties:
 *         rollno:
 *           type: string
 *           example: "GLOBAL001"
 *         password:
 *           type: string
 *           example: "securePassword123"
 *     GlobalAdminSignUp:
 *       type: object
 *       required:
 *         - name
 *         - rollno
 *         - password
 *         - department
 *         - phoneno
 *         - yearofstudy
 *       properties:
 *         name:
 *           type: string
 *           example: "Global Admin"
 *         rollno:
 *           type: string
 *           example: "GLOBAL001"
 *         password:
 *           type: string
 *           example: "securePassword123"
 *         department:
 *           type: string
 *           example: "Administration"
 *         email:
 *           type: string
 *           example: "global001@example.com"
 *         phoneno:
 *           type: integer
 *           format: int64
 *           example: 9876543210
 *         yearofstudy:
 *           type: integer
 *           example: 4
 *         is_global_admin:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /auth/global/signup:
 *   post:
 *     tags: [GlobalAuth]
 *     summary: Register a new global admin
 *     description: Creates a new global admin account with system-wide privileges
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GlobalAdminSignUp'
 *     responses:
 *       201:
 *         description: Global admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Global admin registered successfully"
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Server error
 */
globalAuthRouter.post('/signup', signupController);

/**
 * @swagger
 * /auth/global/login:
 *   post:
 *     tags: [GlobalAuth]
 *     summary: Global admin login
 *     description: Authenticates a global admin with system-wide privileges
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginGlobalAdmin'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Global admin logged in successfully"
 *       401:
 *         description: Authentication failed - User does not exist or wrong password
 *       500:
 *         description: Server error
 */
globalAuthRouter.post('/login', loginController);

/**
 * @swagger
 * /auth/global/logout:
 *   post:
 *     tags: [GlobalAuth]
 *     summary: Global admin logout
 *     description: Logs out a global admin by clearing auth cookies
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Global admin logged out successfully"
 */
globalAuthRouter.post('/logout', logoutController);

/**
 * @swagger
 * /auth/global/getnewaccesstoken:
 *   get:
 *     tags: [GlobalAuth]
 *     summary: Get new access token for global admin
 *     description: Generates a new access token using the existing refresh token in cookies
 *     responses:
 *       200:
 *         description: New tokens generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New global admin access token generated"
 *       401:
 *         description: Invalid or expired refresh token
 *       403:
 *         description: Not authorized as global admin
 */
globalAuthRouter.get('/getnewaccesstoken', getNewAccessTokenController);

export default globalAuthRouter;