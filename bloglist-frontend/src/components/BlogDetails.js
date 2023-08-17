import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLikes } from "../reducers/blogReducer";
import { setMessage } from "../reducers/messageReducer";
import { removeBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { setErrorMessage } from "../reducers/errorMessageReducer";

const BlogDetails = ({ blogs }) => {
  const navigate = useNavigate();
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

  const deleteBlog = async () => {
    try {
      await dispatch(removeBlog(blog));
      dispatch(setMessage(`The blog '${blog.title}' has been deleted`, 3));
    } catch (error) {
      console.log("error", error);
      dispatch(
        setErrorMessage(
          "You are not authorised to delete other users' blogs!",
          3
        )
      );
    }

    navigate("/blogs");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a target="_blank" rel="noopener noreferrer" href={"https://" + blog.url}>
        {blog.url}
      </a>
      <div>
        <p>
          likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
      </div>
      <p>added by {blog.author}</p>
      <button id="delete-button" onClick={deleteBlog}>
        Remove blog
      </button>
    </div>
  );
};

export default BlogDetails;
