import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_API_URL;
const LOGIN_URL = `${backendURL}/login`;
const SIGNUP_URL = `${backendURL}/signup`;
const LOGOUT_URL = `${backendURL}/logout`;

const localData = JSON.parse(localStorage.getItem('authData'));

const initialState = {
  user: localData ? localData.user : {},
  isLoading: true,
  token: localData ? localData.token : '',
  message: '',
  isLogedin: !!localData,
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (loginData, thunkAPI) => {
    try {
      const res = await axios.post(LOGIN_URL, loginData, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      console.log('login error', err.response.data.error);
      return thunkAPI.rejectWithValue('Login failed');
    }
  },
);

export const fetchSignup = createAsyncThunk(
  'auth/fetchSignup',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(SIGNUP_URL, { user: data }, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`Failed: ${err.response.data.error}`);
    }
  },
);

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async (data, thunkAPI) => {
        try {
        const res = await axios.delete(LOGOUT_URL, { user: data }, {
            headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${data.token}`,
            },
        });
        return res.data;
        } catch (err) {
        return thunkAPI.rejectWithValue(`Failed: ${err.response.data.error}`);
        }
    },
    );

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authData');

      return {
        ...state,
        user: {},
        isLogined: false,
        token: '',
      };
    },
    resetMessage: (state) => ({ ...state, message: '' }),
  },
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(fetchLogout.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchSignup.fulfilled, (state, { payload }) => {
        const data = {
          token: '',
          user: {},
        };

        localStorage.setItem('authData', JSON.stringify(data));
        return ({
          ...state,
          isLoading: false,
          token: '',
          user: {},
          isLogedIn: false,
          message: 'LogedOut Successfully',
        });
      })
      .addCase(fetchSignup.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }));
        // Login
      .addCase(fetchLogin.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        const data = {
          token: payload.token,
          user: payload.user,
        };

        localStorage.setItem('authData', JSON.stringify(data));
        return ({
          ...state,
          isLoading: false,
          token: payload.token,
          user: payload.user,
          isLogedin: true,
          message: 'LogedIn Successfully',
        });
      })
      .addCase(fetchLogin.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }))

      // Sign up
      .addCase(fetchSignup.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchSignup.fulfilled, (state, { payload }) => {
        const data = {
          token: payload.token,
          user: payload.user,
        };

        localStorage.setItem('ebikeData', JSON.stringify(data));
        return ({
          ...state,
          isLoading: false,
          token: payload.token,
          user: payload.user,
          isLogedIn: true,
          message: 'Successfully Sign up & Login',
        });
      })
      .addCase(fetchSignup.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }));
  },
});

export const { logout, resetMessage } = authSlice.actions;

export default authSlice.reducer;