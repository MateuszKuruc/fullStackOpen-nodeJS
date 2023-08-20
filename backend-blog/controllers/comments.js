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
  const body = await request.body;
  
});

module.exports = commentsRouter;
