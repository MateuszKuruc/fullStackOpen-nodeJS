import messageReducer from "./reducers/messageReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    message: messageReducer,
  },
});

export default store;
