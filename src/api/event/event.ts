import { Router} from 'express';


import RegisterController from './controller.js';

const eventRouter = Router();
eventRouter.post('/user/register/:eventId',RegisterController)
export default eventRouter;