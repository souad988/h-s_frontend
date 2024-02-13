import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;
const PRODUCTS_URL = `${REACT_APP_BACKEND_URL}/api/v1/products`;

const localData = JSON.parse(localStorage.getItem('productData'));

const initialState = {
  products: localData ? localData.products : {},
  product: {},
  isLoading: true,
  message: '',
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
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

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${PRODUCTS_URL}/${id}`, {
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
      }))
      // fetch product
      .addCase(fetchProduct.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProduct.fulfilled, (state, { payload }) => {
        const data = {
          product: payload,
        };

        localStorage.setItem('productData', JSON.stringify(data));
        return {
          ...state,
          isLoading: false,
          ...data,
        };
      })
      .addCase(fetchProduct.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }));
  },
});

export default productSlice.reducer;
