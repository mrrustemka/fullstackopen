const { test, after, before, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

const helper = require('../utils/for_testing');
const User = require('../models/user');

before(async () => {
  const mongoUrl =
    process.env.TEST_MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb';
  await mongoose.connect(mongoUrl);
});

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('users in DB', () => {
  test.only('creation fails with proper status code and message if password are not valid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'test1',
      name: 'test1'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    console.log('Response body: ' + JSON.stringify(result.body) + '\n');

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes(
        'Password is required and must be at least 3 characters long'
      )
    );

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
