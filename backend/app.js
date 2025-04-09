import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));