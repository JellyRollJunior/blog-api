import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { jwtStrategy } from './strategies/jsonWebToken.js';
import { usersRouter } from './routes/usersRouter.js';
import { authRouter } from './routes/authRouter.js';
import { postsRouter } from './routes/postsRouter.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // enable data from post req
passport.use(jwtStrategy);

// routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// error handling
app.use(/(.*)/, (req, res, next) => {
    res.status(404).json({ error: '404 Page not found' });
});
app.use((error, req, res, next) => {
    if (error && error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
});

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
