import * as postController from '../controllers/postController.js';
import passport from 'passport';
import { Router } from 'express';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const postRouter = Router();

postRouter.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postController.postPost
);

export { postRouter };
