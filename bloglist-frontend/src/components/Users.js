import { Link } from "react-router-dom";
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";

const Users = ({ users }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <h3>User name</h3>
              </TableCell>
              <TableCell>
                <h3>Number of blogs</h3>
              </TableCell>
            </TableRow>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
