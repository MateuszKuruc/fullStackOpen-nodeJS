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
    <div>
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h5">Blog list:</Typography>
      <List>
        <Typography style={{ fontStyle: "italic" }}>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <ListItemText primary={blog.title} />
              </Link>
            </ListItem>
          ))}
        </Typography>
      </List>
    </div>
  );
};

export default UserDetails;
