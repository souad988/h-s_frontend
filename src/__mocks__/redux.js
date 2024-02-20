import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/product/productSlice'; // Replace with the actual path

// Mocking Redux store for testing
const mockStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: { product: productReducer },
    preloadedState,
  });
  store.dispatch = jest.fn(); // Mock the dispatch function

  return store;
};

export default mockStore;
