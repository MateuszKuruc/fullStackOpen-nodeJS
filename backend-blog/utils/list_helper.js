const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);

  return likes.reduce((total, number) => total + number, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const blogWithMostLikes = blogs.find((blog) => blog.likes === mostLikes);
  return blogWithMostLikes;
};

const mostBlogs = (blogs) => {
  const { author } = _.maxBy(blogs, (blog) => blog.author);
  const blogsWritten = blogs.reduce((total, blog) => {
    return blog.author === author ? total + 1 : total;
  }, 0);

  const topAuthor = {
    author: author,
    blogs: blogsWritten,
  };

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
