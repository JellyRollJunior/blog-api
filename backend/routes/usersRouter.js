import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.post('/', usersController.postUser);

export { usersRouter };
