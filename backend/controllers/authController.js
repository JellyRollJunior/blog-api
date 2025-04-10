import * as db from '../model/db.js';
import { bcrypt } from 'bcryptjs';

const postSignUp = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.insertUser(username, hashedPassword);
        res.json(user);
    } catch (error) {
        return error.code == 'P2002'
            ? res.json({ error: 'Username already in already taken.' })
            : res.json({ error: 'Error signing up. Please try again later.' });
    }
};

export { postSignUp };
