import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import ErrorMessage from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

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
      setErrorMessage(null);
      setMessage(`${user.name} logged in`);
      console.log('user logged in, should see message');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      console.log("error", exception);
      setMessage(null);
      setErrorMessage("Wrong credentials!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
          {/* <Message message={message} />
          <ErrorMessage errorMessage={errorMessage} /> */}
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            message={message}
            error={errorMessage}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const displayBlog = () => (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <ErrorMessage error={errorMessage} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setMessage(`${user.name} logged out`);
    setUser(null);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
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
    setTitle("");
    setAuthor("");
    setUrl("");
    setMessage(`a new blog '${newBlog.title}' by ${newBlog.author} was added`);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div>
      {user === null && loginForm()}
      {user && (
        <div>
          <p>
            {/* <Message message={message} /> */}
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

