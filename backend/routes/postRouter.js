import * as postController from '../controllers/postController.js';
import { Router } from 'express';

const postRouter = Router();

postRouter.post('/', postController.postPost);

export { postRouter }