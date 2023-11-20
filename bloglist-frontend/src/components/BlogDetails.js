import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLikes } from "../reducers/blogReducer";
import { setMessage } from "../reducers/messageReducer";
import { removeBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { setErrorMessage } from "../reducers/errorMessageReducer";

import { useEffect } from "react";
import { initializeComments } from "../reducers/commentReducer";
// import { useSelector } from "react-redux";
import { createComment } from "../reducers/commentReducer";
import { useState } from "react";

import {
  Button,
  TableContainer,
  Table,
  // TableBody,
  // TableRow,
  // TableCell,
  TextField,
  Typography,
} from "@mui/material";

const BlogDetails = ({ blogs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    dispatch(initializeComments());
  }, [dispatch]);

  // const comments = useSelector((state) => state.comments);

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }

  // const commentsToDisplay = comments.filter(
  //   (comment) => comment.blog.id === blog.id
  // );

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
    if (window.confirm("Are you sure you want to delete this blog?")) {
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
    <div style={{ textAlign: "center" }}>
      <Typography variant="bold32">BLOG DETAILS</Typography>
      <div>
        <p>
          <Typography variant="italic2" color="#1976D2">
            {blog.title}
          </Typography>
        </p>

        <div>
          <Typography variant="body1">
            Written by{" "}
            <span style={{ color: "#FF4081", fontWeight: "bold" }}>
              {blog.author}
            </span>
          </Typography>
          <Typography variant="body1">
            Read at{" "}
            <span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://" + blog.url}
                className="blogLink"
              >
                {blog.url}
              </a>
            </span>
          </Typography>
        </div>
      </div>
      <div className="scoreContainer">
        <Typography variant="bold20">SCORE</Typography>
        <Typography variant="bold32" color="#1976D2">
          {blog.likes}
        </Typography>
        <Button
          onClick={addLike}
          variant="contained"
          style={{ width: "200px" }}
        >
          <Typography variant="bold16">like this blog</Typography>
        </Button>
      </div>

      <Button
        variant="outlined"
        id="delete-Button"
        onClick={deleteBlog}
        style={{ width: "200px", marginBottom: "4rem" }}
      >
        <Typography variant="bold16">Delete blog</Typography>
      </Button>
      <div>
        <Typography variant="bold20">COMMENTS</Typography>

        <TableContainer>
          <Table>
            {/* <TableBody>
              {commentsToDisplay.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <Typography variant="body1">
                      {comment.comment}{" "}
                      <span
                        style={{
                          fontStyle: "italic",
                          fontWeight: 900,
                          color: "#1976D2",
                        }}
                      >
                        by Anonymous
                      </span>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
        <div style={{ textAlign: "start" }}>
          <form onSubmit={addComment}>
            <Button
              variant="contained"
              type="submit"
              style={{ marginBottom: "2rem", marginTop: "2rem" }}
            >
              <Typography variant="bold16">Add new comment</Typography>
            </Button>
            <div>
              <TextField
                value={comment}
                label="Comment here..."
                multiline
                rows="4"
                style={{ width: "100%", paddingBottom: "2rem" }}
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
