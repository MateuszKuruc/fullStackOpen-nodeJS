import messageReducer from "./reducers/messageReducer";
import { configureStore } from "@reduxjs/toolkit";
import errorMessageReducer from "./reducers/errorMessageReducer";

const store = configureStore({
  reducer: {
    message: messageReducer,
    erroMessage: errorMessageReducer,
  },
});

export default store;
