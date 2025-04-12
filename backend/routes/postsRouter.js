import * as postController from '../controllers/postsController.js';
import passport from 'passport';
import { Router } from 'express';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const postsRouter = Router();

postsRouter.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postController.postPost
);

export { postsRouter };
