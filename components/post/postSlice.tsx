import { RootState } from "@/app/store/store";

import axios from "axios";

import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export type reactions = {
  thumbsUp: number;
  thumbsDown: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
};

export type Posts = {
  id: string;
  title: string;
  body: string;
  userId: number;
  date: string;
  reactions: reactions;
};

type stateProps = {
  posts: Posts[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

// const initialState: Posts[] = [
//   {
//     id: "1",
//     title: "learning redux toolkit",
//     content: "i have heard very good things about you",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       thumbsDown: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//     userId: 0,
//   },
//   {
//     id: "2",
//     title: "The more i say slice, the more i want pizza",
//     content: "i have heard very good things about you",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       thumbsDown: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//     userId: 2,
//   },
// ];
const initialState: stateProps = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk<
  Posts[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Posts[]>(POSTS_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch posts"
    );
  }
});

export const addNewPost = createAsyncThunk<
  Posts,
  { title: string; body: string; userId: number },
  { rejectValue: string }
>("post/addNewPost", async (initialPost, { rejectWithValue }) => {
  try {
    const response = await axios.post<Posts>(POSTS_URL, initialPost);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "failed to add Posts"
    );
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Posts>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: number): { payload: Posts } {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              thumbsDown: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
            title,
            body,
            userId,
          },
        };
      },
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof reactions }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Posts[]>) => {
          state.status = "succeeded";
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              thumbsDown: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };

            return post;
          });

          state.posts = state.posts.concat(loadedPosts);
        }
      )
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addNewPost.fulfilled, (state, action: PayloadAction<Posts>) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          thumbsDown: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
        console.log(action.payload);
      });
  },
});

export const { postAdded, reactionAdded } = postSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);

export default postSlice.reducer;
