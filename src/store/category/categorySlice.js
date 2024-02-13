import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;
console.log('env', REACT_APP_BACKEND_URL);
const CATEGORIES_URL = `${REACT_APP_BACKEND_URL}/api/v1/categories`;

const localData = JSON.parse(localStorage.getItem('categoryData'));

const initialState = {
  categories: localData ? localData.categories : [],
  isLoading: true,
  message: '',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (thunkAPI) => {
    try {
      const res = await axios.get(CATEGORIES_URL, {
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

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchCategories.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        const data = {
          categories: payload,
        };

        localStorage.setItem('categoryData', JSON.stringify(data));
        return {
          ...state,
          isLoading: false,
          ...data,
        };
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }));
  },
});

export default categorySlice.reducer;
