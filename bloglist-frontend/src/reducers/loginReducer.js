import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setLogin(state, action) {
      console.log("action payload", action.payload);
      return action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const getUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    console.log("getuser user", user);
    dispatch(setLogin(user));
  };
};

export const setTheUser = (userData) => {
  return async (dispatch) => {
    dispatch(setLogin(userData));
  };
};
export default loginSlice.reducer;
