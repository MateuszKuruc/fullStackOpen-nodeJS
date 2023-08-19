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
  const body = await request.body;
  if (!request.likes) {
    body.likes = 0;
  }
  if (!request.comments) {
    body.comments = [];
  }
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
    comments: body.comments,
  });

  const savedBlog = await blog.save();
  savedBlog.populate("user");
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

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: "No authorization to do that" });
  }
  if (!user) {
    response.status(400).json({ error: "User does not exist" });
  }

  const blogToDelete = await Blog.findByIdAndRemove(id);
  console.log("to delete", blogToDelete);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user");

  response.json(updatedBlog);
});

// blogsRouter.post("/:id/comments", async (request, response) => {
//   const content = request.body;
//   if (content) {
//     response.json(content);
//   }
// });

// blogsRouter.post("/:id/comments", async (request, response) => {
//   const comment = request.body.comment;
//   const id = request.params.id;
//   const blog = {
//     ...blog,
//     comments: comment,
//   };
//   console.log("blog, id, comment", blog, id, comment);

//   const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, {
//     new: true,
//   });

//   response.json(blogToUpdate);
// });

module.exports = blogsRouter;
