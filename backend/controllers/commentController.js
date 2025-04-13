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

const isUserCommenter = async (req, commentId) => {
    const username = req.user.username;
    const comment = await db.getCommentById(commentId);
    return comment.length > 0 && username == comment[0].commenter.username;
}

const putComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const userIsCommenter = await isUserCommenter(req, commentId)
        if (userIsCommenter) {
            const content = req.body.content;
            const comment = await db.updateComment(commentId, content);
            return res.json(comment);
        }
        throw new DatabaseError('Error updating comment.');
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
    } catch (error) {
        next(error);
    }
};

export { getComments, postComment, putComment, deleteComment };
