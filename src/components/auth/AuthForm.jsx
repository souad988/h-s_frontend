import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import {
  Box, Typography, Container, CssBaseline, Avatar, TextField, Button, Grid, Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fetchLogin, fetchSignup } from '../../store/auth/authSlice';
import '../../styles/index.css';

const AuthForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = props;
  const dispatch = useDispatch();
  const { user, token, message } = useSelector((state) => state.auth);
  const location = useLocation();
  const [title, setTitle] = useState(location.pathname === '/login' ? 'Login' : 'Register');
  useEffect(() => {
    setTitle(location.pathname === '/login' ? 'Login' : 'Register');
  }, [location.pathname]);
  useEffect(() => {
    console.log('message', message);
    //console.log('props', props);
  }, [message]);
  //console.log('props', props);
  const handleSubmit = (values, e) => {
    e.preventDefault();
    //console.log('handleSubmit');
    console.log('values, user, token, message => ', values, user, token, message);
    if (title === 'Register') {
      delete values.confirmPassword;
      dispatch(fetchSignup(values));
    } else {
      delete values.name;
      delete values.confirmPassword;
      dispatch(fetchLogin(values));
    }
  };
  const isDisabled = () => {
    if (title === 'Register') {
      return Object.keys(values).length < 4 || Object.keys(errors).length > 0;
    }
    return !values.email || !values.password || Object.keys(errors).length > 0;
  };

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
            {title === 'Register' ? 'Sign Up' : 'Sign In'}
          </Typography>
        </Box>
        <Box component="form" onSubmit={(e) => handleSubmit(values, e)} sx={{ mt: 1 }}>
          {title === 'Register' ? (
            <Box>
              { message && <div id="name_error_message" className="error_message">{message}</div>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && touched.name && (<div id="name_error_message" className="error_message">{errors.name}</div>)}
            </Box>
          ) : null}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            autoFocus
          />
          {errors.email && touched.email && <div id="email_error_message" className="error_message">{errors.email}</div>}
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
            onChange={handleChange}
          />
          {errors.password && touched.password && <div id="password_error_message" className="error_message">{errors.password}</div>}
          {title === 'Register' ? (
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="User Name"
                name="confirmPassword"
                autoComplete="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                autoFocus
              />
              {errors.confirmPassword && touched.confirmPassword && <div id="confirmPassword_error_message" className="error_message">{errors.confirmPassword}</div>}
            </Box>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDisabled()}
          >
            { title === 'Register' ? 'Sign Up' : 'Sign In'}
          </Button>
          {title === 'Register' ? (
            <Grid container>
              <Grid item xs>
                <MuiLink href="/login" variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Grid>
            </Grid>
          )
            : (
              <Grid container>
                <Grid item xs='12'>
                  <MuiLink href="#" variant="body2">
                    Forgot password?
                  </MuiLink>
                </Grid>
                <Grid item xs='12'>
                  <MuiLink href="/signup" variant="body2">
                    Dont have an account? Sign Up
                  </MuiLink>
                </Grid>
              </Grid>
            )}
        </Box>
      </Container>
    </div>
  );
};

AuthForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // Define the expected types for each property in the 'values' object
    // These should align with the actual data structure in your application
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool,
    // Define the expected types for each property in the 'touched' object
    // These should align with the actual data structure in your application
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // Define the expected types for each property in the 'errors' object
    // These should align with the actual data structure in your application
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

const AuthFormInhanced = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),

  // Custom sync validation
  validate: (values, {title}) => {
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
    if (title === 'Register' && !values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }
    if (title === 'Register' && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password mismatch';
    }
    return errors;
  },
  displayName: 'BasicForm',
})(AuthForm);

export default AuthFormInhanced;
