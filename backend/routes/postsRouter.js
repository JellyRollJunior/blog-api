import * as postController from '../controllers/postsController.js';
import passport from 'passport';
import { Router } from 'express';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { commentRouter } from './commentRouter.js';
import { postValidation } from '../validations/postValidation.js';

const postsRouter = Router();

postsRouter.get('/', postController.getPosts);
postsRouter.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postValidation,
    postController.postPost
);
postsRouter.put(
    '/:postId',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postValidation,
    postController.putPost
);
postsRouter.delete(
    '/:postId',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    postController.deletePost
);

// comments
postsRouter.use('/', commentRouter);

export { postsRouter };
