import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLikes } from "../reducers/blogReducer";
import { setMessage } from "../reducers/messageReducer";
import { removeBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { setErrorMessage } from "../reducers/errorMessageReducer";

import { useEffect } from "react";
import { initializeComments } from "../reducers/commentReducer";
import { useSelector } from "react-redux";
import { createComment } from "../reducers/commentReducer";

const BlogDetails = ({ blogs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeComments());
  }, [dispatch]);

  const comments = useSelector((state) => state.comments);

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  console.log("blog", blog);
  if (!blog) {
    return null;
  }

  console.log("comments", comments, "blog:", blog);

  const commentsToDisplay = comments.filter(
    (comment) => comment.blog.id === blog.id
  );
  console.log("this blog comments", commentsToDisplay);

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

  const addComment = async () => {
    const newComment = {
      comment: "numero uno",
      // blog: blog.id,
    };
    // console.log("new comment", newComment);
    dispatch(createComment(newComment, blog.id));
    console.log("comments after adding comment", comments);
    navigate(`/blogs/${blog.id}`);
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
      <div>
        <h3>comments</h3>

        {commentsToDisplay.map((comment) => (
          <div key={comment.id}>{comment.comment}</div>
        ))}

        <button onClick={addComment}>Add comment</button>
      </div>
      <button id="delete-button" onClick={deleteBlog}>
        Remove blog
      </button>
    </div>
  );
};

export default BlogDetails;
