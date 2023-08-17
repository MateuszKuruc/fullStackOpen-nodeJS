import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username},</Link> blogs created:{" "}
          {user.blogs.length}
        </div>
      ))}
    </div>
  );
};

export default Users;
