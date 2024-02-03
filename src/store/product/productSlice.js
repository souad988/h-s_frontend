import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'http://localhost:3001/api';
const PRODUCTS_URL = `${backendURL}/v1/products`;

const localData = JSON.parse(localStorage.getItem('productData'));

const initialState = {
  products: localData ? localData.products : {},
  isLoading: true,
  message: '',
};

export const fetchProducts = createAsyncThunk(
  'auth/resendConfirmation',
  async (thunkAPI) => {
    try {
      const res = await axios.get(PRODUCTS_URL, {
        headers: {
          'content-type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        `Failed: ${err.response ? err.response.data.error : err.message}`,
      );
    }
  },
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        const data = {
          products: payload,
        };

        localStorage.setItem('productData', JSON.stringify(data));
        return {
          ...state,
          isLoading: false,
          ...data,
        };
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }));
  },
});

export default productSlice.reducer;
