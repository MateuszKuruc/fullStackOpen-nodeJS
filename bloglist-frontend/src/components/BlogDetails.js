import { useParams } from "react-router-dom";

const BlogDetails = ({ blogs }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  console.log("blog found", blog);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
    </div>
  );
};

export default BlogDetails;
