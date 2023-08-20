const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.get("/:id/comments", async (request, response) => {
  const comments = await Comment.find({}).populate("blog");
  if (comments) {
    response.json(comments);
  } else {
    response.status(404).end();
  }
});

commentsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);
  console.log("blog from db", blog);

  const comment = new Comment({
    comment: body.comment,
    blog: blog.id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment);

  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
