import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getUserById = async (id) => {
    try {
        const user = prisma.user.findFirst({
            where: {
                id,
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Error retrieving user');
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
        throw new DatabaseError('Error retrieving user');
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
        throw new DatabaseError('Error retrieving posts');
    }
}

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
            ? new DatabaseError('Author does not have permission to create posts.', 401)
            : new DatabaseError('Error creating post');
    }
};

export { getUserById, getUserByUsername, insertUser, getPosts, insertPost };
