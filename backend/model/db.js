import { PrismaClient } from '@prisma/client';

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
        throw new Error('Error retrieving user');
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
        throw (error.code == 'P2002')
            ? new Error('Username already in use')
            : new Error('Error creating user');
    }
};

export { getUserById, insertUser };
