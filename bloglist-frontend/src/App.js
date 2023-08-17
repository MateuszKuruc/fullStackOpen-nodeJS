import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Users from "./components/Users";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import ErrorMessage from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogDetails from "./components/BlogDetails";

import { useDispatch } from "react-redux";

import { setMessage } from "./reducers/messageReducer";
import { setErrorMessage } from "./reducers/errorMessageReducer";

import { initializeBlogs } from "./reducers/blogReducer";
import { useSelector } from "react-redux";

import { setLogin } from "./reducers/loginReducer";

import { initializeUsers } from "./reducers/usersReducer";
import UserDetails from "./components/UserDetails";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const login = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);

  const blogList = [...blogs];
  const usersList = [...users];

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token);

      dispatch(setLogin(loggedUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userLogged = await loginService.login({
        username,
        password,
      });
      console.log("loggeduser", userLogged);

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userLogged));
      blogService.setToken(userLogged.token);

      dispatch(setLogin(userLogged));

      setUsername("");
      setPassword("");
      dispatch(setMessage(`${userLogged.name} logged in`, 3));
    } catch (exception) {
      console.log("error logging", exception);
      dispatch(setErrorMessage("Wrong credentials", 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setLogin(null));

    dispatch(setMessage(`${login.name} logged out`, 3));
  };

  return (
    <div>
      <Message />
      <ErrorMessage />

      {/* {login === null && (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )} */}
      {login && (
        <div>
          <p>
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">Users</Link>
            <i>{login.name} logged in</i>
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            login === null && (
              <Togglable buttonLabel="login">
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                  handleSubmit={handleLogin}
                />
              </Togglable>
            )
          }
        />
        <Route path="/users/:id" element={<UserDetails users={usersList} />} />
        <Route path="/blogs/:id" element={<BlogDetails blogs={blogList} />} />
        <Route path="/users" element={<Users users={usersList} />} />
        <Route path="/blogs" element={<Blog blogs={blogList} />} />
      </Routes>

      {/* {login && (
        <div>
          <h2>blogs</h2>
          {blogList
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={login} />
            ))}
        </div>
      )} */}

      {/* {login && (
        <Blog blogs={blogList} />
      )} */}

      {login && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      )}
    </div>
  );
};

export default App;
