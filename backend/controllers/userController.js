import bcrypt from 'bcryptjs';
import * as db from '../model/db.js';
import { DatabaseError } from '../errors/DatabaseError.js';

const postUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.insertUser(username, hashedPassword);
        res.json(user);
    } catch (error) {
        if (error instanceof DatabaseError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error signing up. Please try again later.' });
    }
};

export { postUser };
