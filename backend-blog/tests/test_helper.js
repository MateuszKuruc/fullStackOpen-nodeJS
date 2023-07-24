const blog = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
