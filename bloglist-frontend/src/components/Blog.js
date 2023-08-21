import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const Blog = ({ blogs }) => {
  const [details, setDetails] = useState(false);

  const detailsShown = { display: details ? "" : "none" };
  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div>
      <button onClick={toggleDetails}>
        {details ? "Hide all details" : "View all details"}
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Blog name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell style={detailsShown}>Link</TableCell>
              <TableCell style={detailsShown}>Likes</TableCell>
            </TableRow>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>

                <TableCell style={detailsShown} className="moreInfo">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://" + blog.url}
                  >
                    {blog.url}
                  </a>
                </TableCell>
                <TableCell style={detailsShown} className="moreInfo">
                  {blog.likes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;
