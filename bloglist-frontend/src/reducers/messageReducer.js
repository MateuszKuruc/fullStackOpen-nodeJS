import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: "",
  reducers: {
    createMessage(state, action) {
      const content = action.payload;
      return content;
    },
    removeMessage(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;

export const setMessage = (content, time) => {
  return async (dispatch) => {
    dispatch(createMessage(content));
    setTimeout(() => {
      dispatch(removeMessage(""));
    }, time * 1000);
  };
};
