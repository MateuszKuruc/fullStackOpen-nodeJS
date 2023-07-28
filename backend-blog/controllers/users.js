const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3 || username.length < 3) {
    response.status(400).json({
      error: "username or password not suitable",
    });
  }
  if (!username) {
    response.status(400).json({
      error: "username error",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  savedUser.populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  });

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
