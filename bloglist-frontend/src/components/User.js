// import { Link, Routes, Route } from "react-router-dom";
// import UserDetails from "./UserDetails";

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

const User = ({ users }) => {
  console.log("users", users);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} {user.blogs.length}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
