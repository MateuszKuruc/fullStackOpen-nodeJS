import messageReducer from "./reducers/messageReducer";
import { configureStore } from "@reduxjs/toolkit";
import errorMessageReducer from "./reducers/errorMessageReducer";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    message: messageReducer,
    errorMessage: errorMessageReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: usersReducer,
    comments: commentReducer,
  },
});

export default store;
