import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getUserById = async (id) => {
    try {
        const user = prisma.user.findFirst({
            where: {
                id: Number(id),
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Error retrieving user.');
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = prisma.user.findFirst({
            where: {
                username,
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Error retrieving user.');
    }
};

const insertUser = async (username, password, isAdmin = false) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
                isAdmin,
            },
        });
        return user;
    } catch (error) {
        throw error.code == 'P2002'
            ? new DatabaseError('Username already is already taken.', 400)
            : new DatabaseError('Error signing up. Please try again later.');
    }
};

const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany();
        return posts;
    } catch (error) {
        throw new DatabaseError('Error retrieving posts.');
    }
};

const insertPost = async (authorId, title, content) => {
    try {
        const post = await prisma.post.create({
            data: {
                authorId: Number(authorId),
                title,
                content,
            },
        });
        return post;
    } catch (error) {
        throw error.code == 'P2003'
            ? new DatabaseError(
                  'Author does not have permission to create posts.',
                  401
              )
            : new DatabaseError('Error creating post.');
    }
};

const editPost = async (id, authorId, title, content) => {
    try {
        const post = await prisma.post.update({
            data: {
                authorId,
                title,
                content,
            },
            where: {
                id: Number(id),
            },
        });
        return post;
    } catch (error) {
        throw new DatabaseError('Error editing post.');
    }
};

const deletePost = async (id) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: Number(id),
            },
        });
        return post;
    } catch (error) {
        throw new DatabaseError('Error deleting post.');
    }
};

const getCommentById = async (id) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                id: Number(id),
            },
            include: {
                commenter: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return comments;
    } catch (error) {
        throw new DatabaseError('Error retrieving comment.');
    }
};

const getCommentsByPost = async (postId) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId),
            },
            include: {
                commenter: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return comments;
    } catch (error) {
        throw new DatabaseError('Error retrieving comments.');
    }
};

const insertComment = async (postId, commenterId, content) => {
    try {
        const comment = await prisma.comment.create({
            data: {
                postId: Number(postId),
                commenterId: Number(commenterId),
                content,
            },
        });
        return comment;
    } catch (error) {
        throw new DatabaseError('Error creating comment.');
    }
};

const updateComment = async (id, content) => {
    try {
        const comment = await prisma.comment.update({
            where: {
                id: Number(id),
            },
            data: {
                content,
            },
        });
        return comment;
    } catch (error) {
        throw new DatabaseError('Error updating comment');
    }
};

const deleteComment = async (id) => {
    try {
        const comment = await prisma.comment.delete({
            where: {
                id: Number(id),
            },
        });
        return comment;
    } catch (error) {
        throw new DatabaseError('Error deleting comment');
    }
};

export {
    getUserById,
    getUserByUsername,
    insertUser,
    getPosts,
    insertPost,
    editPost,
    deletePost,
    getCommentById,
    getCommentsByPost,
    insertComment,
    deleteComment,
};
