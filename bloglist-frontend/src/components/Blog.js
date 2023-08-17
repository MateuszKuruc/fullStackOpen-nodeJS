import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blogs }) => {
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
      <button onClick={toggleDetails}>
        {details ? "Hide details" : "View details"}
      </button>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div style={blogStyle} className="completedBlog">
            <div className="basicInfo">
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
              {/* <button onClick={toggleDetails}>
                {details ? "hide" : "view"}
              </button> */}
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
