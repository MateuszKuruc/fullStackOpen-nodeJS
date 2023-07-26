import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
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
  )

  const displayBlog = () => (
    <div>
    <h2>blogs</h2>
    
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      </div>
  )

  
  return (
    <div>
      {user === null && loginForm()}
      {user !== null && displayBlog()}
    </div>
  );
};

export default App;
