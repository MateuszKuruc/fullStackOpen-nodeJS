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
import { useState } from "react";

const BlogDetails = ({ blogs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    dispatch(initializeComments());
  }, [dispatch]);

  const comments = useSelector((state) => state.comments);

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }

  const commentsToDisplay = comments.filter(
    (comment) => comment.blog.id === blog.id
  );

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

  const addComment = async (event) => {
    event.preventDefault();
    if (comment.length > 3) {
      const newComment = {
        comment: comment,
      };
      dispatch(createComment(newComment, blog.id));
      setComment("");
      navigate(`/blogs/${blog.id}`);
      dispatch(
        setMessage(`A new comment has been added to blog '${blog.title}'!`, 3)
      );
    } else {
      dispatch(
        setErrorMessage("Comment needs to be at least 3 characters long!", 3)
      );
      return;
    }
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
      <div>
        <h3>comments</h3>

        {commentsToDisplay.map((comment) => (
          <div key={comment.id}>{comment.comment}</div>
        ))}

        <form onSubmit={addComment}>
          <button type="submit">Add comment</button>
          <div>
            <input
              value={comment}
              id="comment"
              placeholder="enter comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
