import { configureStore } from '@reduxjs/toolkit';
import greetingsReducer from './slices/greetingsSlice';
import authReducer from './auth/authSlice';
import productReducer from './product/productSlice';
import categoryReducer from './category/categorySlice';

const store = configureStore({
  reducer: {
    greetings: greetingsReducer,
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
