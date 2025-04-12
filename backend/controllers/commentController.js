import * as db from '../model/db.js';

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

export { postComment };
