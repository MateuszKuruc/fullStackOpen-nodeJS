import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const UserDetails = ({ users }) => {
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="bold32" color="#1976D2">
        {user.name}
      </Typography>

      <Typography variant="body1">Blogs added by {user.name}</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <div className="userDetailsBlogs">
              <ListItemText
                primary={blog.title}
                className="blogLink"
                style={{ color: "#1976D2" }}
              />

              <Link
                to={`/blogs/${blog.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="bold20" className="blogLink">
                  Show details
                </Typography>
              </Link>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDetails;
