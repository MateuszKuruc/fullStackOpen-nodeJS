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

import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";

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
      <h2>
        Blog:{" "}
        <span style={{ fontStyle: "italic", fontWeight: 300 }}>
          {blog.title}
        </span>
      </h2>
      <div style={{ marginBottom: 16 }}>
        Link:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"https://" + blog.url}
        >
          {blog.url}
        </a>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 5 }}>Likes: {blog.likes}</div>
        <div>
          <Button onClick={addLike} variant="contained">
            like blog
          </Button>
        </div>
      </div>
      <p>
        Blog written by{" "}
        <span style={{ fontStyle: "italic", fontWeight: 900 }}>
          {blog.author}
        </span>
      </p>
      <Button
        style={{ marginBottom: "2rem" }}
        variant="outlined"
        id="delete-Button"
        onClick={deleteBlog}
      >
        Remove blog
      </Button>
      <div>
        <h3>Comments</h3>

        <TableContainer>
          <Table>
            <TableBody>
              {commentsToDisplay.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    {comment.comment}{" "}
                    <span style={{ fontStyle: "italic", fontWeight: 900 }}>
                      by Anonymous
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <form onSubmit={addComment}>
            <Button
              variant="contained"
              type="submit"
              style={{ marginBottom: 10, marginTop: 10 }}
            >
              Add new comment
            </Button>
            <div>
              <TextField
                value={comment}
                label="comment here..."
                multiline
                rows="4"
                style={{ width: "100%" }}
                onChange={({ target }) => setComment(target.value)}
              ></TextField>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
