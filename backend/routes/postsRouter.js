import * as postController from '../controllers/postsController.js';
import passport from 'passport';
import { Router } from 'express';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const postsRouter = Router();

postsRouter.get('/', postController.getPosts);
postsRouter.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postController.postPost
);
postsRouter.delete(
    '/:postId',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postController.deletePost
);

export { postsRouter };
