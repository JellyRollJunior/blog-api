import passport from 'passport';
import { Router } from 'express';
import * as commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.post(
    '/:postId/comments',
    passport.authenticate('jwt', { session: false }),
    commentController.postComment
);

export { commentRouter };
