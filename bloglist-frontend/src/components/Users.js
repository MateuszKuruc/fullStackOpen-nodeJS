import { Link } from "react-router-dom";
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
  Typography,
} from "@mui/material";

const Users = ({ users }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="bold20">User name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="bold20">Number of blogs</Typography>
              </TableCell>
            </TableRow>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Button component={Link} to={`/users/${user.id}`}>
                    <Typography variant="bold20">{user.username}</Typography>
                  </Button>
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
