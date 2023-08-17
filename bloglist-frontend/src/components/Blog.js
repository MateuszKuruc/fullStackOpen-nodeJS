import { useState } from "react";
// import { handleLikes } from "../reducers/blogReducer";
// import { useDispatch } from "react-redux";
// import { removeBlog } from "../reducers/blogReducer";
// import { setMessage } from "../reducers/messageReducer";

// import { useSelector } from "react-redux/es/hooks/useSelector";

import { Link } from "react-router-dom";

const Blog = ({ blogs }) => {
  // const activeUser = useSelector((state) => state.login.username);

  // if (activeUser !== blog.user.username) {
  //   return null;
  // }

  // const dispatch = useDispatch();

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
  //   const updatedBlog = {
  //     user: blog.user.id,
  //     likes: Number(blog.likes + 1),
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url,
  //     id: blog.id,
  //   };

  //   dispatch(handleLikes(updatedBlog));
  //   dispatch(setMessage(`You liked '${blog.title}' by ${blog.author}!`, 3));
  // };

  // const deleteBlog = () => {
  //   dispatch(removeBlog(blog));
  //   dispatch(setMessage(`The blog '${blog.title}' has been deleted`, 3));
  // };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div style={blogStyle} className="completedBlog">
            <div className="basicInfo">
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
              <button onClick={toggleDetails}>
                {details ? "hide" : "view"}
              </button>
            </div>
            <div style={detailsShown} className="moreInfo">
              <div>url: {blog.url}</div>
              <div>likes: {blog.likes}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

//   <div style={blogStyle} className="completeBlog">
//     <div className="basicInfo">
//       <Link to={`/blogs/${blog.id}`}>
//         {blog.title} {blog.author}
//       </Link>
//       <button onClick={toggleDetails}>{details ? "hide" : "view"}</button>
//     </div>
//     <div style={detailsShown} className="moreInfo">
//       <div>url: {blog.url}</div>
//       <div>likes: {blog.likes}</div>
//       <div>user: {blog.user.username}</div>
//       {/* <button id="delete-button" onClick={deleteBlog}>
//           remove
//         </button> */}
//     </div>
//   </div>
// );

export default Blog;
