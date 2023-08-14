import { useState } from "react";
import { handleLikes } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

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
    const updatedBlog = {
      user: blog.user.id,
      likes: Number(blog.likes + 1),
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    };

    dispatch(handleLikes(updatedBlog));
  };

  const deleteBlog = () => {
    dispatch(removeBlog(blog));
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
          likes: {blog.likes}{" "}
          <button id="like-button" onClick={addLike}>
            like
          </button>
        </div>
        <div>user: {blog.user.username}</div>
        <button id="delete-button" onClick={deleteBlog}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
