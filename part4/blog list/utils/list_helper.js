const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc + cur.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  return blogs[0];
};

const mostBlogs = (blogs) => {
  data = [];

  for (const blog of blogs) {
    if (data.find((d) => d.author === blog.author)) {
      data[data.findIndex((d) => d.author === blog.author)].blogs++;
    } else {
      data.push({ author: blog.author, blogs: 1 });
    }
  }

  return data.sort((a, b) => {
    return b.blogs - a.blogs;
  })[0];
};

const mostLikes = (blogs) => {
  data = [];

  for (const blog of blogs) {
    if (data.find((d) => d.author === blog.author)) {
      data[data.findIndex((d) => d.author === blog.author)].likes += blog.likes;
    } else {
      data.push({ author: blog.author, likes: blog.likes });
    }
  }

  return data.sort((a, b) => {
    return b.likes - a.likes;
  })[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
