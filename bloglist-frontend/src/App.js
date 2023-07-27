import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import ErrorMessage from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

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

  const displayBlog = () => (
    <div>
      <h2>blogs</h2>
      {/* <Message message={message} />
      <ErrorMessage error={errorMessage} /> */}
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
      <Message message={message} />
      <ErrorMessage error={errorMessage} />
      {user === null &&
      <Togglable buttonLabel='logineiro'>
        <LoginForm 
         username={username}
         password={password}
         handleUsernameChange={({ target }) => setUsername(target.value)}
         handlePasswordChange={({ target }) => setPassword(target.value)}
         handleSubmit={handleLogin}
        />
      </Togglable>}
      {user && (
        <div>
          <p>
            <i>{user.name} logged in</i>
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      {user !== null && displayBlog()}
      {user && 
      <Togglable buttonLabel='create new blog'>
        <BlogForm 
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={addBlog}
        />
      </Togglable>
      }
    </div>
  );
};

export default App;


