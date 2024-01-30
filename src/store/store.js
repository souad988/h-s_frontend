import { configureStore } from '@reduxjs/toolkit';
import greetingsReducer from './slices/greetingsSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    greetings: greetingsReducer,
    auth: authReducer,
  },
});

export default store;
