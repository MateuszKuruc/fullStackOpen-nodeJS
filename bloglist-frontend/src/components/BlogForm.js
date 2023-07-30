import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState([]);

  const addBlog = (event) => {
    event.preventDefault();
    if (title.length === 0 || author.length === 0 || url.length === 0) {
      return;
    }

    createBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            id="title"
            placeholder="enter title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            id="author"
            placeholder="enter author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            value={url}
            id="url"
            placeholder="enter url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
