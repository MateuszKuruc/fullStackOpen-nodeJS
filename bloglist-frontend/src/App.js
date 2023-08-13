import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import ErrorMessage from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  // const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

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
      // setMessage(`${user.name} logged in`);
      // setTimeout(() => {
      //   setMessage(null);
      // }, 3000);
      dispatch
    } catch (exception) {
      console.log("error", exception);
      // setMessage(null);
      dispatch
      setErrorMessage("Wrong credentials!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    // setMessage(`${user.name} logged out`);
    dispatch
    setUser(null);
    // setTimeout(() => {
    //   setMessage(null);
    // }, 3000);
    dispatch
  };

  const addBlog = (blogObject) => {
    console.log("blog object", blogObject);
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      // setMessage(`'${blogObject.title}' blog by ${blogObject.author} created`);
      // setTimeout(() => {
      //   setMessage(null);
      // }, 3000);
      dispatch
    });
  };

  const handleLikes = (updatedObject) => {
    blogService
      .update(updatedObject)
      .then(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
      })
      .catch((error) => console.log(error.response.data));
  };

  const deleteBlog = (blogObject) => {
    blogService.remove(blogObject).then(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    });
  };

  return (
    <div>
      {/* <Message message={message} /> */}
      <Message />
      <ErrorMessage error={errorMessage} />
      {user === null && (
        <Togglable buttonLabel="login">
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
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikes={handleLikes}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
        </div>
      )}
      {user && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default App;
