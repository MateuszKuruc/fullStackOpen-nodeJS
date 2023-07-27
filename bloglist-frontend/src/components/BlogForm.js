import { useState } from "react";

// const BlogForm = ({
//   title,
//   author,
//   url,
//   handleTitleChange,
//   handleAuthorChange,
//   handleUrlChange,
//   handleSubmit,
// }) => {

//   return (
//     <div>
//       <h2>create new blog</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           title
//           <input value={title} onChange={handleTitleChange} />
//         </div>
//         <div>
//           author
//           <input value={author} onChange={handleAuthorChange} />
//         </div>
//         <div>
//           url
//           <input value={url} onChange={handleUrlChange} />
//         </div>
//         <button type="submit">create</button>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState([]);

  const addBlog = (event) => {
    event.preventDefault();
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
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
