import * as db from '../model/db.js';

const postPost = async (req, res) => {
    try {
        const { authorId, title, content } = req.body;
        const post = await db.insertPost(authorId, title, content);
        res.json(post);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
};

export { postPost }