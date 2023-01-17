import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/posts";
import { commentsReducer } from './slices/comments';

const store = configureStore({
   reducer: {
      posts: postReducer,
      auth: authReducer,
      comments: commentsReducer,
   }
});

export default store;