import * as postController from '../controllers/postsController.js';
import passport from 'passport';
import { Router } from 'express';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { commentRouter } from './commentRouter.js';
import { postValidation } from '../validations/postValidation.js';
import { authenticateJwt } from '../middleware/authenticateJwt.js';

const postsRouter = Router();

postsRouter.get('/', postController.getPosts);
postsRouter.get(
    '/admin',
    authenticateJwt,
    verifyAdmin,
    postController.getAllPosts
);
postsRouter.post(
    '/',
    authenticateJwt,
    verifyAdmin,
    postValidation,
    postController.postPost
);
postsRouter.put(
    '/:postId',
    authenticateJwt,
    verifyAdmin,
    postValidation,
    postController.putPost
);
postsRouter.delete(
    '/:postId',
    authenticateJwt,
    verifyAdmin,
    postController.deletePost
);

// comments
postsRouter.use('/', commentRouter);

export { postsRouter };
