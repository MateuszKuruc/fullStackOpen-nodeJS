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
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log("blogs:", blogs);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("use effect1");
  }, []);

  useEffect(() => {
    console.log("use effect2");
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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setMessage(`${user.name} logged out`);
    setUser(null);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setMessage(`'${blogObject.title}' blog by ${blogObject.author} created`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    });
  };

  const handleLikes = (updatedObject) => {
    blogService
      .update(updatedObject)
      .then(() => {
        // setBlogs(blogs.concat(returnedBlog));
        blogService.getAll().then((blogs) => setBlogs(blogs));
        // setMessage(`'${updatedObject.title}' blog's like added!`);
        // setTimeout(() => {
        //   setMessage(null);
        // }, 3000);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div>
      <Message message={message} />
      <ErrorMessage error={errorMessage} />
      {user === null && (
        <Togglable buttonLabel="logineiro">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            <i>{user.name} logged in</i>
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => 
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
          )}
        </div>
      )}
      {user && (
        <Togglable buttonLabel="create new blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default App;
