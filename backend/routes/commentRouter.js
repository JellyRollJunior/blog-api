import passport from 'passport';
import { Router } from 'express';
import * as commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.get(
    '/:postId/comments',
    commentController.getComments
);
commentRouter.post(
    '/:postId/comments',
    passport.authenticate('jwt', { session: false }),
    commentController.postComment
);
commentRouter.put(
    '/:postId/comments/:commentId',
    passport.authenticate('jwt', { session: false }),
    commentController.putComment
);
commentRouter.delete(
    '/:postId/comments/:commentId',
    passport.authenticate('jwt', { session: false }),
    commentController.deleteComment
)

export { commentRouter };
