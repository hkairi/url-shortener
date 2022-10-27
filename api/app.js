import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/database.js';

import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const app = express();

connectDB();

import indexRouter from './routes/index.js';
import urlsRouter  from './routes/urls.js';
import usersRouter from './routes/users.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('common'));
app.use(cors());

app.use('/',      indexRouter);
app.use('/urls',  urlsRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
const BASE = process.env.BASE_URL || 'localhost:3000';

app.listen(PORT, () => {
  console.log(`API Server is running at PORT ${PORT} | BASE_URL ${BASE}`);
});
