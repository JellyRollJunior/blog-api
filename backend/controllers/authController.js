import bcrypt from 'bcryptjs';
import * as db from '../model/db.js';

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
    res.json({ message: 'success!' });
};

export { postLogin };
