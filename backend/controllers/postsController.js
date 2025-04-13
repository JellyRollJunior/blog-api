import * as db from '../model/db.js';
import { validationResult } from 'express-validator';

const getPosts = async (req, res, next) => {
    try {
        const posts = await db.getPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await db.getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
}

const postPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        const authorId = req.user.id;
        const { title, content } = req.body;
        const publishTime = new Date(req.body.publishTime);
        const post = await db.insertPost(authorId, title, content, publishTime);
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const putPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        const postId = req.params.postId;
        const authorId = req.user.id;
        const { title, content } = req.body;
        const publishTime = new Date(req.body.publishTime);
        const post = await db.editPost(postId, authorId, title, content, publishTime);
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

export { getPosts, getAllPosts, postPost, putPost, deletePost };
