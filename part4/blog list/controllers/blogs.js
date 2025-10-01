const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  });
  res.json(blogs);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1
  });

  res.status(201).json(populatedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: `it's not your post` });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end();
      }

      blog.title = title;
      blog.author = author;
      blog.url = url;
      blog.likes = likes;

      return blog.save().then((updatetdBlog) => {
        response.json(updatetdBlog);
      });
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
