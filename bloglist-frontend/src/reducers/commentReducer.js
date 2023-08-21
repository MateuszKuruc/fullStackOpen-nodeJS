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
