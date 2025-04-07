import { Router} from 'express';

import {updateEventcontroller,AddingWinnerController} from './controller.js';
const eventRouter = Router();


eventRouter.put('/:id',updateEventcontroller);
eventRouter.post('/addWinners',AddingWinnerController);
export default eventRouter;