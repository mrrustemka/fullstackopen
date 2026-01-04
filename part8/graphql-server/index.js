require('dotenv').config();

const startServer = require('./server');

const PORT = process.env.PORT || 40000;

startServer(PORT);
