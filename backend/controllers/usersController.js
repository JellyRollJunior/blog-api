import bcrypt from 'bcryptjs';
import * as db from '../model/db.js';

const postUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = req.body.isAdmin
            ? await db.insertUser(username, hashedPassword, true)
            : await db.insertUser(username, hashedPassword);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export { postUser };
