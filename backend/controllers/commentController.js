import { DatabaseError } from '../errors/DatabaseError.js';
import * as db from '../model/db.js';

const getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const comments = await db.getCommentsByPost(postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

const postComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commenterId = req.user.id;
        const content = req.body;
        const comment = await db.insertComment(postId, commenterId, content);
        res.json(comment);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const username = req.user.username;
        const comment = await db.getCommentById(commentId);
        // delete comment if user is commenter or admin
        if (
            comment.length > 0 &&
            (username == comment[0].commenter.username || req.user.isAdmin)
        ) {
            await db.deleteComment(commentId);
            return res.json(comment);
        }
        throw (comment.length > 0)
            ? new DatabaseError('Not authorized to delete this comment.', 401)
            : new DatabaseError('Error deleting comment.', 500);
    } catch (error) {
        next(error);
    }
};

export { getComments, postComment, deleteComment };
