// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserDetails = ({ users }) => {
  const id = useParams().id;
  console.log("id", id);
  const user = users.find((user) => user.id === id);
  console.log("user found", user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
