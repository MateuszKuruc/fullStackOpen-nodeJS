const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Blog1",
    author: "Matiautor",
    url: "bing.com",
    likes: 4,
  },
  {
    title: "Blog2",
    author: "parampam",
    url: "fullstackopen.com",
    likes: 7,
  },
];

module.exports = {
  initialBlogs,
};
