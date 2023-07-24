const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

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

test.skip("blog identifier is named id instead of _id", async () => {
  const response = await api.get("/api/blogs/");
  expect(response.body[0].id).toBeDefined();
});

test.skip("blog post method should add new blog to db", async () => {
  const newBlog = {
    title: "Blog3",
    author: "Pamsi",
    url: "bbc.com",
    likes: 33,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
}, 10000);

test.skip("when likes property is missing, use default value of 0", async () => {
  const newBlog = {
    title: "NoLikes",
    author: "bubens",
    url: "nononono.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[2].likes).toBeDefined();
  expect(blogsAtEnd[2].likes).toEqual(0);
});

test.skip("if title or url is missing, show 400 error", async () => {
  const newBlog = {
    title: "missing url",
    author: "bambino",
    likes: 3,
  };
  const newBlog2 = {
    author: "missing title",
    url: "bumbini.com",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  await api.post("/api/blogs").send(newBlog2).expect(400);
}, 100000);

test.skip("check if blog post is deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  const contents = blogsAtEnd.map((blog) => blog.title);

  expect(contents).not.toContain(blogToDelete.title);
});

test("update blog post info", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const updatedBlog = blogsAtStart[0];
  const changedBlog = {
    id: updatedBlog.id,
    title: "bahaaaaama",
    author: "kluqqqqqska",
    url: "noboboddddbo.com",
    likes: 33,
  };

  await api.put(`/api/blogs/${updatedBlog.id}`).send(changedBlog);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[0]).toEqual(changedBlog);
});

afterAll(async () => {
  await mongoose.connection.close();
});
