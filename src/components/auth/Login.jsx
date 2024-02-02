import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import {
  Box, Typography, Container, CssBaseline, Avatar, TextField, Button, Grid, Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fetchLogin, fetchResendConfirmation } from '../../store/auth/authSlice';
import '../../styles/index.css';
import { customHandleChange } from './authform';

const Login = (props) => {
  const navigate = useNavigate();
  const {
    values,
    touched,
    errors,
    handleBlur,
    confirmation,
  } = props;
  const dispatch = useDispatch();
  const {
    message, isLogedin, confirmed, user,
  } = useSelector((state) => state.auth);
  console.log('message and confirmed ===> ', message, confirmed);
  const handleSubmit = (values, e) => {
    e.preventDefault();
    dispatch(fetchLogin({ email: values.email, password: values.password }));
  };
  const resendConfirmation = () => {
    dispatch(fetchResendConfirmation(user.email ? user.email : values.email));
  };

  const isDisabled = () => !values.email || !values.password || Object.keys(errors).length > 0;

  useEffect(() => {
    console.log('message changed here ===> ', message);
  }, [message]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          { confirmation && confirmation.length > 0 && <div className="error_message">{confirmation}</div>}
          { message && !isLogedin ? <div className="error_message">{message}</div> : <div className="fulfilled_message">{message}</div>}
        </Box>
        <Box component="form" onSubmit={(e) => handleSubmit(values, e)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={(e) => customHandleChange(e, props)}
            autoFocus
          />
          {errors.email && touched.email && <div className="error_message">{errors.email}</div>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onBlur={handleBlur}
            onChange={(e) => customHandleChange(e, props)}
          />
          {errors.password && touched.password && <div className="error_message">{errors.password}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDisabled()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs="12">
              <Button onClick={() => navigate('/resetPassword')} variant="body2">
                Forgot password?
              </Button>
            </Grid>
            <Grid item xs="12">
              <Button onClick={() => navigate('/signup')} variant="body2">
                Dont have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
          { !confirmed && (
          <Grid container>
            <Grid item xs="12">
              <MuiLink href="#" variant="body2" onClick={() => resendConfirmation()}>
                Didnt receive confirmation email? Resend now
              </MuiLink>
            </Grid>
          </Grid>
          )}
        </Box>
      </Container>
    </div>
  );
};

Login.propTypes = {
  confirmation: PropTypes.string.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    // Define the expected types for each property in the 'values' object
    // These should align with the actual data structure in your application
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    // Define the expected types for each property in the 'touched' object
    // These should align with the actual data structure in your application
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    // Define the expected types for each property in the 'errors' object
    // These should align with the actual data structure in your application
  }).isRequired,
  handleBlur: PropTypes.func.isRequired,
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  handleChange: (e, { props }) => customHandleChange(e, props),
  // Custom sync validation
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  },
  displayName: 'BasicForm',
})(Login);

export default LoginForm;
