import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'http://localhost:3001';
console.log('backendURL', backendURL);
const LOGIN_URL = `${backendURL}/login`;
const SIGNUP_URL = `${backendURL}/signup`;
const LOGOUT_URL = `${backendURL}/logout`;
const RESEND_CONFIRMATION_URL = `${backendURL}/confirmation/resend`;
const RESETPASSWORDLINK_URL = `${backendURL}/resetPassword`;

const localData = JSON.parse(localStorage.getItem('authData'));

const initialState = {
  user: localData ? localData.user : {},
  isLoading: true,
  token: localData ? localData.token : '',
  message: '',
  isLogedin: !!localData,
  confirmed: localData ? localData.confirmed : true,
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (loginData, thunkAPI) => {
    try {
      const res = await axios.post(LOGIN_URL, { user: loginData }, {
        headers: {
          'content-type': 'application/json',
        },
      });
      return res.data.status.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.response.data}`);
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
      return thunkAPI.rejectWithValue(`Failed: ${err.response.data.error.message}`);
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

export const fetchResendConfirmation = createAsyncThunk(
  'auth/resendConfirmation',
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(`${RESEND_CONFIRMATION_URL}?email=${data}`, {
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

export const fetchResetPasswordLink = createAsyncThunk(
  'auth/resetPasswordLink',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(RESETPASSWORDLINK_URL, { email: data }, {
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
      .addCase(fetchLogout.fulfilled, (state) => {
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
      .addCase(fetchLogout.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
      }))
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
          confirmed: data.user.confirmed,
        });
      })
      .addCase(fetchLogin.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        isLogedin: false,
        confirmed: payload !== 'You have to confirm your email address before continuing.',
        message: payload,
      }))
      // Sign up
      .addCase(fetchSignup.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchSignup.fulfilled, (state, { payload }) => {
        const data = {
          user: { email: payload.email },
          confirmed: payload.data.confirmed,
        };

        localStorage.setItem('authData', JSON.stringify(data));
        return ({
          ...state,
          isLoading: false,
          token: '',
          user: data.user,
          isLogedIn: true,
          message: 'Successfully Signed up & Logedin',
          confirmed: payload.data.confirmed,
        });
      })
      .addCase(fetchSignup.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
        isLogedin: false,
      }))
      // resend confirmation
      .addCase(fetchResendConfirmation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchResendConfirmation.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isLogedIn: false,
        message: 'Confirmation email sent Please check your email',
      }))
      .addCase(fetchResendConfirmation.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
        isLogedin: false,
      }))
      // send ResetPasswordLink
      .addCase(fetchResetPasswordLink.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchResetPasswordLink.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isLogedIn: false,
        message: 'Reset password link was sent Please check your email',
      }))
      .addCase(fetchResetPasswordLink.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        message: payload,
        isLogedin: false,
      }));
  },
});

export const { logout, resetMessage } = authSlice.actions;

export default authSlice.reducer;
