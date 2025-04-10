import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRouter.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // enable data from post req

// routes
app.get('/', (req, res) => res.json('hey guys'));
app.use('/user', userRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
