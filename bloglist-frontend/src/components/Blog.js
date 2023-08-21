import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const Blog = ({ blogs }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  const [details, setDetails] = useState(false);

  const detailsShown = { display: details ? "" : "none" };
  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div>
      <button onClick={toggleDetails}>
        {details ? "Hide details" : "View details"}
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                {/* <TableCell style={blogStyle} className="completedBlog"> */}
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                {/* <TableCell style={detailsShown} className="moreInfo"> */}

                {/* <TableCell>url: {blog.url}</TableCell>
                <TableCell>likes: {blog.likes}</TableCell> */}

                <TableCell style={detailsShown} className="moreInfo">
                  url: {blog.url}
                </TableCell>
                <TableCell style={detailsShown} className="moreInfo">
                  likes: {blog.likes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  // return (
  //   <div>
  //     <button onClick={toggleDetails}>
  //       {details ? "Hide details" : "View details"}
  //     </button>
  //     {blogs.map((blog) => (
  //       <div key={blog.id}>
  //         <div style={blogStyle} className="completedBlog">
  //           <div className="basicInfo">
  //             <Link to={`/blogs/${blog.id}`}>
  //               {blog.title} {blog.author}
  //             </Link>
  //           </div>
  //           <div style={detailsShown} className="moreInfo">
  //             <div>url: {blog.url}</div>
  //             <div>likes: {blog.likes}</div>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default Blog;

// return (
//   <div>
//     <TableContainer component={Paper}>
//       <Table>
//         <TableBody>
//           {blogs.map((blog) => (
//             <TableRow key={blog.id}>
//               <TableCell>
//                 <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
//               </TableCell>
//               <TableCell>{blog.author}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </div>
// );
