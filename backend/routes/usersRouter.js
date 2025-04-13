import { Router } from 'express';
import { userValidation } from '../validations/userValidation.js';
import * as usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.post('/', userValidation, usersController.postUser);

export { usersRouter };
