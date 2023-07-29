import { useState } from "react";

const Blog = ({ blog, handleLikes, deleteBlog }) => {
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

  const addLike = () => {
    handleLikes({
      user: blog.user.id,
      likes: Number(blog.likes + 1),
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    });
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog '${blog.title} by ${blog.author}?`))
      deleteBlog(blog);
  };

  return (
    <div style={blogStyle} className="completeBlog">
      <div className="basicInfo">
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{details ? "hide" : "view"}</button>
      </div>
      <div style={detailsShown} className="moreInfo">
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>user: {blog.user.username}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
