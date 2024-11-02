// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice'; 
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    tasks: taskSlice, 
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
