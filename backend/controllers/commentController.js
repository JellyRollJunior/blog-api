import { validationResult } from 'express-validator';
import { DatabaseError } from '../errors/DatabaseError.js';
import * as db from '../model/db.js';

const isUserCommenter = async (req, commentId) => {
    const username = req.user.username;
    const comment = await db.getCommentById(commentId);
    return comment.length > 0 && username == comment[0].commenter.username;
}

const getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const comments = await db.getCommentsByPost(postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

const postComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ValidationError('Error validating comment', errors.array()));
        }
        const postId = req.params.postId;
        const commenterId = req.user.id;
        const content = req.body.content;
        const comment = await db.insertComment(postId, commenterId, content);
        res.json(comment);
    } catch (error) {
        next(error)
    }
};

const putComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ValidationError('Error validating comment', errors.array()));
        }
        const commentId = req.params.commentId;
        const userIsCommenter = await isUserCommenter(req, commentId)
        if (userIsCommenter) {
            const content = req.body.content;
            const comment = await db.editComment(commentId, content);
            return res.json(comment);
        }
        throw new DatabaseError('User is unauthorized to edit this comment', 401);
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const userIsCommenter = await isUserCommenter(req, commentId)
        if (userIsCommenter || req.user.isAdmin) {
            const comment = await db.deleteComment(commentId);
            return res.json(comment);
        }
        throw new DatabaseError('User is unauthorized to delete this comment', 401);
    } catch (error) {
        next(error);
    }
};

export { getComments, postComment, putComment, deleteComment };
