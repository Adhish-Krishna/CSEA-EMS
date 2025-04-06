import { Router} from 'express';

import {RegisterController,updateEventcontroller} from './controller.js';
import { userAuthMiddleware } from '../../middleware/authMiddleware.js';
const eventRouter = Router();

eventRouter.post('/user/register/:eventId',userAuthMiddleware,RegisterController);
eventRouter.put('/events/:id',userAuthMiddleware,updateEventcontroller);
export default eventRouter;