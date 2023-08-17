import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLikes } from "../reducers/blogReducer";
import { setMessage } from "../reducers/messageReducer";

const BlogDetails = ({ blogs }) => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

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
    dispatch(setMessage(`You liked '${blog.title}' by ${blog.author}!`, 3));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <p>
          likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
      </div>
      <p>added by</p>
    </div>
  );
};

export default BlogDetails;
