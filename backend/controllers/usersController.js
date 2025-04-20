import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import * as db from '../model/db.js';
import { ValidationError } from '../errors/ValidationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';

const getUser = async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user.'})
    }
}

const postUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ValidationError('Error validating user', errors.array()));
        }
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

export { getUser, postUser };
