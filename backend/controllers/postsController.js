import * as db from '../model/db.js';

const getPosts = async (req, res) => {
    try {
        const posts = await db.getPosts();
        res.json(posts);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
};

const postPost = async (req, res) => {
    try {
        const { authorId, title, content } = req.body;
        const post = await db.insertPost(authorId, title, content);
        res.json(post);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await db.deletePost(postId);
        res.json(deletedPost);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
};

export { getPosts, postPost, deletePost };
