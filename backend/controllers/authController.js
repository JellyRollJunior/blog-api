import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as db from '../model/db.js';
dotenv.config();

const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);
    if (!user) {
        res.status(401).json({ error: 'Username is incorrect.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(401).json({ error: 'Password is incorrect.' });
    }
    // Auth successful: sign token with user info
    const options = {
        expiresIn: 60 * 60
    };
    const token = jwt.sign(
        { id: user.id, username: user.username, isAdmin: user.isAdmin },
        process.env.TOKEN_SECRET,
        options
    );
    res.json({ message: 'Authentication success!', token });
};

export { postLogin };
