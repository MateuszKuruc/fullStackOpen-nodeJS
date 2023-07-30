const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
require("express-async-errors");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDb:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.errorHandler);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
