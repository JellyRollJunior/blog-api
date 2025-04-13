import * as db from '../model/db.js';

const getPosts = async (req, res, next) => {
    try {
        const posts = await db.getPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const postPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user.id;
        const publishTime = new Date(req.body.publishTime);
        const post = await db.insertPost(authorId, title, content, publishTime);
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const putPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const { title, content } = req.body;
        const authorId = req.user.id;
        const post = await db.editPost(postId, authorId, title, content);
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await db.deletePost(postId);
        res.json(deletedPost);
    } catch (error) {
        next(error);
    }
};

export { getPosts, postPost, putPost, deletePost };
