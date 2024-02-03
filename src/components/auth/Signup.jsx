import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import {
  Box, Typography, Container, CssBaseline, Avatar, TextField, Button, Grid, Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fetchSignup } from '../../store/auth/authSlice';
import '../../styles/index.css';
import { customHandleChange } from './authform';

const SignUp = (props) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
  } = props;
  const dispatch = useDispatch();
  const {
    message, isLogedin,
  } = useSelector((state) => state.auth);
  const handleSubmit = (values, e) => {
    e.preventDefault();
    dispatch(fetchSignup({ name: values.name, email: values.email, password: values.password }));
  };
  const isDisabled = () => Object.keys(values).length < 4 || Object.keys(errors).length > 0;

  useEffect(() => {
    console.log('message changed here ===> ', message, isLogedin);
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
            Sign Up
          </Typography>
          { message && isLogedin ? <div className="fulfilled_message">{message}</div> : <div className="error_message">{message}</div>}

        </Box>
        <Box component="form" onSubmit={(e) => handleSubmit(values, e)} sx={{ mt: 1 }}>
          <Box>
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
              onChange={(e) => customHandleChange(e, props)}
              autoFocus
            />
            {errors.name && touched.name && (<div className="error_message">{errors.name}</div>)}
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
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
            onChange={(e) => customHandleChange(e, props)}
          />
          {errors.password && touched.password && <div className="error_message">{errors.password}</div>}
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="confirmPassword"
              name="confirmPassword"
              autoComplete="confirmPassword"
              value={values.confirmPassword}
              onChange={(e) => customHandleChange(e, props)}
              autoFocus
            />
            {errors.confirmPassword && touched.confirmPassword && <div id="confirmPassword_error_message" className="error_message">{errors.confirmPassword}</div>}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDisabled()}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink href="/login" variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

SignUp.propTypes = {
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
  handleBlur: PropTypes.func.isRequired,
};

const SignUpForm = withFormik({
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
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password mismatch';
    }
    return errors;
  },
  displayName: 'BasicForm',
})(SignUp);

export default SignUpForm;
