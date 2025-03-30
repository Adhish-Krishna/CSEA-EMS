import { Router, Request, Response } from 'express';
import { loginController, signupController } from './controller.js';

const userAuthRouter = Router();

userAuthRouter.post('/signup', async (req: Request, res: Response) => {
    await signupController(req, res);
});

userAuthRouter.post('/login', async (req: Request, res: Response)=>{
    await loginController(req,res);
})

export default userAuthRouter;