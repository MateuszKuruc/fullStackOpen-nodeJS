import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentSlice.actions;
export default commentSlice.reducer;

export const initializeComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll();
    dispatch(setComments(comments));
  };
};

// export const createComment = () => {
//     return async dispatch => {
//         const
//     }
// }
