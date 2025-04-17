import { Router } from 'express';
import { authenticateJwt } from '../middleware/authenticateJwt.js';
import { userValidation } from '../validations/userValidation.js';
import * as usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/', authenticateJwt, usersController.getUser);
usersRouter.post('/', userValidation, usersController.postUser);

export { usersRouter };
