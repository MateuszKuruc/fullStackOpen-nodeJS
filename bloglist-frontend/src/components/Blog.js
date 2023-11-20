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
  Typography,
} from "@mui/material";

const Blog = ({ blogs }) => {
  const [details, setDetails] = useState(false);

  const detailsShown = { display: details ? "" : "none" };
  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <Button
        onClick={toggleDetails}
        variant="outlined"
        color="secondary"
        style={{ marginBottom: 10, width: "250px" }}
      >
        {details ? (
          <Typography variant="bold16">Hide all details</Typography>
        ) : (
          <Typography variant="bold16">View all details</Typography>
        )}
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="bold20">Blog name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="bold20">Author</Typography>
              </TableCell>
              <TableCell style={detailsShown}>
                <Typography variant="bold20">Link</Typography>
              </TableCell>
              <TableCell style={detailsShown}>
                <Typography variant="bold20">Likes</Typography>
              </TableCell>
            </TableRow>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="italic1" color="#3b82f6">
                      {blog.title}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" color="#3b82f6">
                    {blog.author}
                  </Typography>
                </TableCell>

                <TableCell style={detailsShown}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://" + blog.url}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="italic1">{blog.url}</Typography>
                  </a>
                </TableCell>
                <TableCell style={detailsShown}>
                  <Typography variant="bold20" color="#3b82f6">
                    {blog.likes}
                  </Typography>
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
