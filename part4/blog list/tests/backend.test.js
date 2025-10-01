const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/for_testing');
const Blog = require('../models/blog');
const assert = require('assert');
const api = supertest(app);
const User = require('../models/user');
const bcrypt = require('bcrypt');

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ username: 'testuser', passwordHash });
  await user.save();

  const usersAtStart = await helper.usersInDb();
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'secret' })
    .expect(200);

  token = loginResponse.body.token;
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('blogs have id property', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  for (const blog of blogs) {
    if (!blog.id) throw new Error('Blog is missing id property');
  }
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test 1',
    author: 'Test A',
    url: 'https://test.com/',
    likes: 0,
    user: {
      username: 'testuser'
    }
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const urls = blogsAtEnd.map((n) => n.url);
  assert(urls.includes(newBlog.url));
});

test('a blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Test A'
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDB();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('deleting a single post', async () => {
  const blogsAtStart = await helper.blogsInDB();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDB();

  const titles = blogsAtEnd.map((b) => b.title);
  assert(!titles.includes(blogToDelete.title));
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test('updating a blog', async () => {
  const blogsAtStart = await helper.blogsInDB();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);

  const blogsAtEnd = await helper.blogsInDB();
  const likesAfter = blogsAtEnd.find((b) => b.id === blogToUpdate.id).likes;
  assert.strictEqual(likesAfter, blogToUpdate.likes + 1);
});

test('token is not provided', async () => {
  const newBlog = {
    title: 'Test 1',
    author: 'Test A',
    url: 'https://test.com/',
    likes: 0,
    user: {
      username: 'testuser'
    }
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
