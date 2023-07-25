const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const tokenExtractor = require("../utils/middleware");
const blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ errror: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id || !request.token) {
    return response.status(401).json({ errror: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id);
  console.log('DELETE THIS SHIT YOOOOO', blog.user.toString());
  console.log('user', user.id);
  console.log(blog.user.toString() === user.id.toString());
 
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'No authorization to do that'})
  }
  if (!user) {
    response.status(400).json({ error: 'User does not exist' })
  }

  const blogToDelete = await Blog.findByIdAndRemove(id);
  console.log('to delete', blogToDelete);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
