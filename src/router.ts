import { Router } from 'express';
import { traineeRouter, userRouter } from './Controllers';

const mainRouter: Router = Router();
mainRouter.use('/trainee', traineeRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;
