const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const jobsRouter = require('./routes/jobsRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authMiddleware);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(errorMiddleware);

module.exports = app;
