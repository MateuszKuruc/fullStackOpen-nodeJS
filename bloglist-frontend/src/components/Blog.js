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

export default Blog;
