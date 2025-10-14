const usersRouter = require('express').Router();
const mongoose = require('mongoose');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 3
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
