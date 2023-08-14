import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    addLike(state, action) {
      return action.payload;
    },
    // setVotes(state, action) {
    //   return state.map((b) =>
    //     b.id === action.payload.id ? action.payload : b
    //   );
    // },
  },
});

export default blogSlice.reducer;
export const { setBlogs, appendBlog, addLike, setVotes } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    console.log("new blog", newBlog);
    dispatch(appendBlog(newBlog));
  };
};

export const handleLikes = (content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(content);
    console.log("updated", updatedBlog);
    dispatch(addLike(updatedBlog));
  };
};

export const removeBlog = (object) => {
  return async (dispatch) => {
    await blogService.remove(object);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

// export const getVote = (id) => {
//   return async (dispatch) => {
//     const blogs = await blogService.getAll();
//     const blogToChange = blogs.find((b) => b.id === id);
//     const changedBlog = {
//       ...blogToChange,
//       likes: blogToChange.likes + 1,
//     };
//     await blogService.update(changedBlog);

//     dispatch(setVotes(changedBlog));
//   };
// };
