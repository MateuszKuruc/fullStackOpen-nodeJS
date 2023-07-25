import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    
    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
      <input onSubmit={handleLogin}
      type='password'
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
      </form>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
