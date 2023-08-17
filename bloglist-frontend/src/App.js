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
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

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
      const loggedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);

      dispatch(setLogin(loggedUser));

      setUsername("");
      setPassword("");
      dispatch(setMessage(`${loggedUser.name} logged in`, 3));
    } catch (exception) {
      console.log("error logging", exception);
      dispatch(setErrorMessage("Wrong credentials", 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setLogin(null));

    dispatch(setMessage(`${login.name} logged out`, 3));
    navigate("/");
  };

  return (
    <div>
      <Message />
      <ErrorMessage />
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
        <Route
          path="/blogs"
          element={
            login && (
              <>
                <Blog blogs={blogList} />
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
              </>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
