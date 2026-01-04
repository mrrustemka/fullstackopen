require('dotenv').config();

const connectToDB = require('./db');
const startServer = require('./server');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 40000;

const main = async () => {
  await connectToDB(MONGODB_URI);
  startServer(PORT);
};

main();
