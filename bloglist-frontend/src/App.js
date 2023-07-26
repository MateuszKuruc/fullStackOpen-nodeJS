import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("error", exception);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          onSubmit={handleLogin}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const displayBlog = () => (
    <div>
      <h2>blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const blogForm = () => (
    <div>
      <h1>create new blog</h1>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <div>
            Author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));
  };

  return (
    <div>
      {user === null && loginForm()}
      {user && (
        <div>
          <p>
            <i>{user.name} logged in</i>
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      {user !== null && displayBlog()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
