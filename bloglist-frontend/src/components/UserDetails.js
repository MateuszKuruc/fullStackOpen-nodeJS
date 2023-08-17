// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const UserDetails = ({ user }) => {
//   const users = useSelector((state) => state.users);

//   const id = useParams().id;
//   console.log("id", id);
//   const specificUser = users.find((user) => user.id === id);
//   console.log("specificUser", specificUser);
//   console.log("user props", user);

//   if (!user) {
//     return null;
//   }

//   return (
//     <div>
//       <h2>test 123</h2>
//       {specificUser.username}
//     </div>
//   );

//   //   return (
//   //     <div>
//   //       <ul key={user.id}>{user.name}</ul>
//   //       {user.blogs.map((blog) => (
//   //         <li key={blog.id}>{blog.title}</li>
//   //       ))}
//   //     </div>
//   //   );
// };

// export default UserDetails;
