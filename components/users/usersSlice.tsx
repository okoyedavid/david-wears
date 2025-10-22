import { RootState } from "@/app/store/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

type usersProps = { id: number; name: string };
type stateProps = {
  users: usersProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: stateProps = { users: [], status: "idle", error: null };

export const fetchUsers = createAsyncThunk<
  stateProps["users"],
  void,
  { rejectValue: string }
>("posts/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<stateProps["users"]>(USERS_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch posts"
    );
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<stateProps["users"]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      }
    );
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
