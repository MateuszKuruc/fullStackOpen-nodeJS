const Blog = ({ blog }) => {
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button>view</button>
      </div>
      url: {blog.url}
      likes: {blog.likes}
      user: {blog.user.username} 
    </div>
  );
};

export default Blog;
