// src/store/UserSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData } from './mockUserData';
import { User, UserState, UserStatus } from './interfaces';


const initialState: UserState = {
  user: null,
  status: UserStatus.IDLE,
};

export const getUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await fetchUserData();
  return response;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserData.pending, (state) => {
          state.status = UserStatus.LOADING;
        })
        .addCase(getUserData.fulfilled, (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.status = UserStatus.SUCCEEDED;
        })
        .addCase(getUserData.rejected, (state) => {
            state.status = UserStatus.FAILED;
        });
    },
  });
  

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
