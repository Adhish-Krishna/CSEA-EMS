import { Router} from 'express';
import { loginController, signupController } from './controller.js';

const userAuthRouter = Router();

userAuthRouter.post('/signup', signupController);

userAuthRouter.post('/login', loginController);

export default userAuthRouter;