import { useState } from "react";

const Blog = ({ blog, user, handleLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [details, setDetails] = useState(false);
  // const [update, setUpdate] = useState([])

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
      id: blog.id
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{details ? 'hide' : 'view'}</button>
      </div>
      <div style={detailsShown}>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>user: {blog.user.username}</div>
      </div>
    </div>
  );
};

export default Blog;
