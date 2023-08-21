import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setMessage } from "../reducers/messageReducer";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";

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
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            label="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 5 }}
            label="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          id="save-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
