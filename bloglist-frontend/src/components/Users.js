// import { Link, Routes, Route } from "react-router-dom";
// import UserDetails from "./UserDetails";

import { Link } from "react-router-dom";

// const User = ({ user }) => {
//   console.log("user in user", user);
//   return (
//     <div>
//       <table>
//         <thead></thead>
//         <tbody>
//           <tr>
//             <td>
//               <Link to={`/users/${user.id}`}>
//                 <h4>{user.name}</h4>
//               </Link>
//             </td>
//             <td>blogs created: {user.blogs.length}</td>
//           </tr>
//         </tbody>
//       </table>
//       <div>
//         <Routes>
//           <Route path="/users/:id" element={<UserDetails user={user} />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

const Users = ({ users }) => {
  console.log("users", users);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username},</Link> blogs created: {user.blogs.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
