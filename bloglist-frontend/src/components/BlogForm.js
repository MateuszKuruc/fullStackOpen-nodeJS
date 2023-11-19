import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setMessage } from "../reducers/messageReducer";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography } from "@mui/material";

const BlogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState([]);

  const addBlog = async (event) => {
    event.preventDefault();
    if (title.length === 0 || author.length === 0 || url.length === 0) {
      return;
    }

    dispatch(createBlog({ title, author, url }));

    dispatch(setMessage(`New blog '${title}' has been added!`, 3));

    setTitle("");
    setAuthor("");
    setUrl("");

    navigate("/blogs");
  };

  return (
    <div>
      <Typography variant="bold20">BLOG FORM</Typography>

      <form className="blogForm" onSubmit={addBlog}>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
            className="formField"
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            label="Author"
            onChange={({ target }) => setAuthor(target.value)}
            className="formField"
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 5 }}
            label="URL"
            onChange={({ target }) => setUrl(target.value)}
            className="formField"
          />
        </div>
        <Button
          id="save-button"
          variant="contained"
          color="primary"
          type="submit"
          style={{ width: "250px", marginBottom: "0.5rem" }}
        >
          <Typography variant="bold16">Save</Typography>
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
