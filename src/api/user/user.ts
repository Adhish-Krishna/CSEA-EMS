import { Router} from 'express';

import acceptTeamInviteController from './controller.js';

const userRouter = Router();
userRouter.post('/user/acceptTeamInvite/:eventId',acceptTeamInviteController)
export default userRouter;