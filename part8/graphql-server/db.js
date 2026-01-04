const mongoose = require('mongoose');

const connectToDB = async (uri) => {
  console.log('Connecting to DB URI:', uri);

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connection to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
