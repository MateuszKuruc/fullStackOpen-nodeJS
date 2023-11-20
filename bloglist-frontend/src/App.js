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
    body3: { lineHeight: 1.6, fontSize: 14, fontWeight: 400 },
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

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

      navigate("/blogs");

      dispatch(setMessage(`${loggedUser.name} logged in`, 3));
    } catch (exception) {
      console.log("error logging", exception);
      dispatch(setErrorMessage("Wrong credentials", 3));
    }
    setLoading(false);
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
                sx={{
                  backgroundColor: activeTab === "blogs" ? "#1976D2" : "",
                }}
                onClick={() => setActiveTab("blogs")}
              >
                <Typography variant="bold20">Blogs</Typography>
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/users"
                sx={{
                  backgroundColor: activeTab === "users" ? "#1976D2" : "",
                }}
              >
                <Typography
                  variant="bold20"
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
                <div className="loginPage">
                  <Typography variant="bold32" color="#FF4081">
                    Welcome to the Bloglist!
                  </Typography>
                  <ul
                    style={{
                      marginBottom: "2rem",
                      marginTop: "2rem",
                      color: "#1976D2",
                    }}
                  >
                    <li>
                      <Typography variant="italic2">
                        Add new blogs with title, author and link
                      </Typography>
                      <li>
                        <Typography variant="italic2">
                          Delete your blogs that you do not like anymore
                        </Typography>
                      </li>
                    </li>
                    <li>
                      <Typography variant="italic2">
                        Push the like button for blogs you enjoy
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="italic2">
                        Check how many blogs other users added
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="italic2">
                        Add anonymous comments to any blog you want
                      </Typography>
                    </li>
                  </ul>

                  <div
                    style={{
                      marginBottom: "2rem",
                      border: "2px solid green",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      width: "500px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="bold20">Test account:</Typography>
                    <Typography variant="body2">Username: demo</Typography>
                    <Typography variant="body2">Password: test123</Typography>
                  </div>

                  <Typography variant="italic2">Log in to begin!</Typography>

                  <Togglable buttonLabel="login">
                    <LoginForm
                      handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                      }
                      handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                      }
                      handleSubmit={handleLogin}
                      loading={loading}
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
