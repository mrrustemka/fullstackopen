require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

const mongoUrl = process.env.DB_URI;
mongoose.connect(mongoUrl);

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(middleware.errorHandler);
app.use('/api/login', loginRouter);

module.exports = app;
