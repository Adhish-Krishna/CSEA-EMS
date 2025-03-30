import { Router, Request, Response } from 'express';
import { signupController } from './controller.js';

const userAuthRouter = Router();

userAuthRouter.post('/signup', async (req: Request, res: Response) => {
    await signupController(req, res);
});

export default userAuthRouter;