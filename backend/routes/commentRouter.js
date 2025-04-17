import passport from 'passport';
import { Router } from 'express';
import { commentValidation } from '../validations/commentValidation.js';
import * as commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.get(
    '/:postId/comments',
    commentController.getComments
);
commentRouter.post(
    '/:postId/comments',
    authenticateJwt,
    commentValidation,
    commentController.postComment
);
commentRouter.put(
    '/:postId/comments/:commentId',
    authenticateJwt,
    commentValidation,
    commentController.putComment
);
commentRouter.delete(
    '/:postId/comments/:commentId',
    authenticateJwt,
    commentController.deleteComment
)

export { commentRouter };
