import { useState } from "react";
import { handleLikes } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
// import { getVote } from "../reducers/blogReducer";
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

  // const addLike = () => {
  //   handleLikes({
  //     user: blog.user.id,
  //     likes: Number(blog.likes + 1),
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url,
  //     id: blog.id,
  //   });
  // };

  const addLike = () => {
    console.log("blog before", blog);
    console.log("blog after", { ...blog, likes: blog.likes + 1 });
    dispatch(handleLikes({ ...blog, likes: blog.likes + 1 }));
  };

  // const removeBlog = () => {
  //   if (window.confirm(`Remove blog '${blog.title} by ${blog.author}?`))
  //     deleteBlog(blog);
  // };

  const deleteBlog = () => {
    // removeBlog(blog);
    dispatch(removeBlog(blog));
  };

  // const vote = (blog) => {
  //   const blogId = blog.id;
  //   dispatch(getVote(blogId));
  // };

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
            {/* <button id="like-button" onClick={() => vote(blog)}> */}
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
