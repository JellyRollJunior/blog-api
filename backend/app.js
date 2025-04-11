import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRouter.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // enable data from post req

// routes
app.get('/', (req, res) => res.json('hey guys'));

import bcrypt from 'bcryptjs';
import * as db from './model/db.js';
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);
    if (!user) {
        res.status(401).json({ error: 'Username is incorrect.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(401).json({ error: 'Password is incorrect.' });
    }
    res.json({ message: 'success!'});
});
app.use('/user', userRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
