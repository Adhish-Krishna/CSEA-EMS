import { Router} from 'express';

import RegisterController from './controller.js';
import { userAuthMiddleware } from '../../middleware/authMiddleware.js';
const eventRouter = Router();

eventRouter.post('/user/register/:eventId',userAuthMiddleware,RegisterController);

export default eventRouter;