import messageReducer from "./reducers/messageReducer";
import { configureStore } from "@reduxjs/toolkit";
import errorMessageReducer from "./reducers/errorMessageReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    message: messageReducer,
    errorMessage: errorMessageReducer,
    blogs: blogReducer,
  },
});

export default store;
