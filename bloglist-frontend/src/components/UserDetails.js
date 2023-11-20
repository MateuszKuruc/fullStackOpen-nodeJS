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
    <div style={{ textAlign: "center" }}>
      <Typography variant="bold32" color="#1976D2">
        {user.name}
      </Typography>

      <Typography variant="body1">Blogs added by {user.name}</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDetails;
