import * as db from '../model/db.js';

const getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const comments = await db.getComments(postId);
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

export { getComments, postComment };
