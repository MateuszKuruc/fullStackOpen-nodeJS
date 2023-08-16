import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const createUser = () => {
  return async (dispatch) => {
    dispatch()
  };
};
export default userSlice.reducer;
