import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Blog = ({ blogs }) => {
  const [details, setDetails] = useState(false);

  const detailsShown = { display: details ? "" : "none" };
  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div>
      <Button onClick={toggleDetails} variant="outlined" color="primary">
        {details ? "Hide all details" : "View all details"}
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <h3>Blog name</h3>
              </TableCell>
              <TableCell>
                <h3>Author</h3>
              </TableCell>
              <TableCell style={detailsShown}>
                <h3>Link</h3>
              </TableCell>
              <TableCell style={detailsShown}>
                <h3>Likes</h3>
              </TableCell>
            </TableRow>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    <i>{blog.title}</i>
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>

                <TableCell style={detailsShown}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://" + blog.url}
                  >
                    {blog.url}
                  </a>
                </TableCell>
                <TableCell style={detailsShown}>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;
