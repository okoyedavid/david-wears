import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/components/post/postSlice";
import usersReducer from "@/components/users/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
