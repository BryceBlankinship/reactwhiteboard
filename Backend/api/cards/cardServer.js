import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import cardsRouter from './cards.js';

const app = express();
app.use(cors());
app.use(express.json());

// const client = redis.createClient({ url: process.env.REDIS_CLIENT_URL });
// redis password: process.env.REDIS_CLIENT_PASSWORD
// admin password: process.env.REDIS_ADMIN_PASSWORD

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});

db.once('open', () => console.log('Connected to MongoDB database!'))

app.use('/api/cards', cardsRouter);

app.listen(process.env.PORT || 8000);