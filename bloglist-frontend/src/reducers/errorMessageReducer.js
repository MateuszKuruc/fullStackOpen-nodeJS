import { createSlice } from "@reduxjs/toolkit";

const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState: "",
  reducers: {
    createErrorMessage(state, action) {
      const content = action.payload;
      return content;
    },
    removeErrorMessage(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { createErrorMessage, removeErrorMessage } =
  errorMessageSlice.actions;
export default errorMessageSlice.reducer;

export const setErrorMessage = (content, time) => {
  return async (dispatch) => {
    dispatch(createErrorMessage(content));
    setTimeout(() => {
      dispatch(removeErrorMessage(""));
    }, time * 1000);
  };
};
