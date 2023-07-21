const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test.skip("blog is returned in JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(2);
}, 10000);

test("blog identifier is named id instead of _id", async () => {
  const response = await api.get("/api/blogs/");
  expect(response.body[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
