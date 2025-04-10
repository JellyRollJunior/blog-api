import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        throw new Error('Error creating user');
    }
};

export { insertUser };
