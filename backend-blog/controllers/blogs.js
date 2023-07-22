const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  }
  if (!request.body.likes) {
    blog.likes = 0;

    blog.save().then((result) => {
      response.status(201).json(result);
    });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
