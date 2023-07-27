import { useState } from "react";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [details, setDetails] = useState(false);

  const detailsShown = { display: details ? "" : "none" };
  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{details ? 'hide' : 'view'}</button>
      </div>
      <div style={detailsShown}>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes} <button>like</button>
        </div>
        <div>user: {user.username}</div>
      </div>
    </div>
  );
};

export default Blog;
