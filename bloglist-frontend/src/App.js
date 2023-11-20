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
import Footer from "./components/Footer";

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
  // IconButton,
  Button,
  Toolbar,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

const matiTheme = createTheme({
  palette: {
    primary: {
      main: "#FF4081",
    },
    secondary: {
      main: "#1976D2",
    },
  },
  typography: {
    bold32: {
      lineHeight: 1.6,
      fontSize: 32,
      fontWeight: 700,
    },
    bold20: {
      lineHeight: 1.6,
      fontSize: 20,
      fontWeight: 700,
    },
    bold16: {
      lineHeight: 1.6,
      fontSize: 16,
      fontWeight: 700,
    },
    body1: { lineHeight: 1.6, fontSize: 20, fontWeight: 400 },
    body2: { lineHeight: 1.6, fontSize: 18, fontWeight: 400 },
    italic1: {
      lineHeight: 1.6,
      fontSize: 18,
      fontStyle: "italic",
      fontWeight: 400,
    },
    italic2: {
      lineHeight: 1.6,
      fontSize: 24,
      fontStyle: "italic",
      fontWeight: 400,
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
  const [activeTab, setActiveTab] = useState("blogs");

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
      <Container
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {login && (
          <AppBar position="static" style={{ padding: 10, marginBottom: 16 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                color="inherit"
                component={Link}
                to="/blogs"
                sx={{ color: activeTab === "blogs" ? "black" : "" }}
                onClick={() => setActiveTab("blogs")}
              >
                <Typography variant="bold20">Blogs</Typography>
              </Button>
              <Button color="inherit" component={Link} to="/users">
                <Typography
                  variant="bold20"
                  sx={{ color: activeTab === "users" ? "black" : "" }}
                  onClick={() => setActiveTab("users")}
                >
                  Users
                </Typography>
              </Button>
              <span style={{ fontStyle: "italic" }}>
                <Typography variant="italic1">
                  <b>{login.name}</b> logged in
                </Typography>
              </span>
              <Button color="inherit" onClick={handleLogout}>
                <Typography variant="bold20">Logout</Typography>
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
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
