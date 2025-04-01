import { Router} from 'express';
import { loginController, signupController, logoutController, generateSecurityCodeController, verifySecurityCodeController, resetpasswordController} from './controller.js';

const userAuthRouter = Router();

/**
 * @swagger
 * /auth/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  example: "johndoe"
 *               rollno:
 *                  type: string
 *                  example: "23N206"
 *               password:
 *                  type: string
 *                  example: "securepassword"
 *               department:
 *                  type: string
 *                  example: "CSE AI ML"
 *               phoneno:
 *                  type: bigint
 *                  example: 1234567890
 *               yearofstudy:
 *                  type: number
 *                  example: 2
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Require all fields"
 */

userAuthRouter.post('/signup', signupController);

/**
 * @swagger
 * /auth/user/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "securepassword"
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
 *                   example: "User logged in successfully"
 *       401:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exists"
 */
userAuthRouter.post('/login', loginController);

/**
 * @swagger
 * /auth/user/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out a user
 *
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mesage:
 *                   type: string
 *                   example: "User logged out successfully"
 *       401:
 *         description: Invalid credentials
 */

userAuthRouter.post('/logout', logoutController);

/**
 * @swagger
 * /auth/user/generatecode:
 *   post:
 *     summary: Generate security code
 *     description: Generates a security code for password reset and sends it to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rollno:
 *                 type: string
 *                 example: "23N206"
 *     responses:
 *       200:
 *         description: Security code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Security Code Created"
 *       401:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exist"
 *       500:
 *         description: Server error
 */
userAuthRouter.post('/generatecode', generateSecurityCodeController);

/**
 * @swagger
 * /auth/user/verifycode:
 *   post:
 *     summary: Verify security code
 *     description: Verifies the security code provided by the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rollno:
 *                 type: string
 *                 example: "23N206"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Security code verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Security Codes matched"
 *       400:
 *         description: Security code doesn't match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Security codes not matched"
 *       401:
 *         description: User or security code not found
 */
userAuthRouter.post('/verifycode', verifySecurityCodeController);

/**
 * @swagger
 * /auth/user/resetpassword:
 *   post:
 *     summary: Reset user password
 *     description: Resets the password for a user after verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rollno:
 *                 type: string
 *                 example: "23N206"
 *               password:
 *                 type: string
 *                 example: "newSecurePassword"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       401:
 *         description: User doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exists"
 *       500:
 *         description: Server error
 */
userAuthRouter.post('/resetpassword', resetpasswordController);

export default userAuthRouter;
