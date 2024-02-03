import { configureStore } from '@reduxjs/toolkit';
import greetingsReducer from './slices/greetingsSlice';
import authReducer from './auth/authSlice';
import productReducer from './product/productSlice';

const store = configureStore({
  reducer: {
    greetings: greetingsReducer,
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
