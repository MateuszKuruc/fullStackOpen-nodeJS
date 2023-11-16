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

import {
  Container,
  AppBar,
  IconButton,
  Button,
  Toolbar,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const matiTheme = createTheme({
  palette: {
    primary: {
      main: "#FF4081",
    },
    secondary: {
      main: "#FFAB40",
    },
  },
});

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
    <ThemeProvider theme={matiTheme}>
      <Container>
        {login && (
          <AppBar position="static" style={{ padding: 10, marginBottom: 16 }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
              ></IconButton>
              <Button color="inherit" component={Link} to="/blogs">
                Blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <span style={{ fontStyle: "italic" }}>
                <b>{login.name}</b> logged in
              </span>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}
        <Message />
        <ErrorMessage />

        <Routes>
          <Route
            path="/"
            element={
              login === null && (
                <div>
                  <h2>Welcome to the blog app!</h2>
                  <p>
                    <i>log in to begin</i>
                  </p>

                  <Togglable buttonLabel="login">
                    <LoginForm
                      handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                      }
                      handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                      }
                      handleSubmit={handleLogin}
                    />
                  </Togglable>
                </div>
              )
            }
          />
          <Route
            path="/users/:id"
            element={<UserDetails users={usersList} />}
          />
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
