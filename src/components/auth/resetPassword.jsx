import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import {
  Box, Typography, Container, CssBaseline, Avatar, TextField, Button, Grid, Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fetchLogin } from '../../store/auth/authSlice';
import '../../styles/index.css';
import { customHandleChange } from './authform';

const ResetPasswordForm = (props) => {
  const {
    values,
    touched,
    errors,
    confirmation,
  } = props;
  const dispatch = useDispatch();
  const {
    message, isLogedin, confirmed,
  } = useSelector((state) => state.auth);
  console.log('reset password ===> ', message, confirmed);

  const handleSubmit = (values, e) => {
    e.preventDefault();
    dispatch(fetchLogin({ email: values.password }));
  };

  const isDisabled = () => {
    if (!values.password || !values.confirmPassword) {
      return true;
    }
    return Object.keys(errors).length > 0;
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
            Resset Password
          </Typography>
          { confirmation && confirmation.length > 0 && <div className="error_message">{confirmation}</div>}
          { message && !isLogedin ? <div className="error_message">{message}</div> : <div className="fulfilled_message">{message}</div>}
        </Box>
        <Box component="form" onSubmit={(e) => handleSubmit(values, e)} sx={{ mt: 1 }}>
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
              label="User Name"
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
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs="12">
              <MuiLink href="/login" variant="body2">
                Sign In
              </MuiLink>
            </Grid>
            <Grid item xs="12">
              <MuiLink href="/signup" variant="body2">
                Dont have an account? Sign Up
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

ResetPasswordForm.propTypes = {
  confirmation: PropTypes.string.isRequired,
  values: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // Define the expected types for each property in the 'values' object
    // These should align with the actual data structure in your application
  }).isRequired,
  touched: PropTypes.shape({
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool,
    // Define the expected types for each property in the 'touched' object
    // These should align with the actual data structure in your application
  }).isRequired,
  errors: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // Define the expected types for each property in the 'errors' object
    // These should align with the actual data structure in your application
  }).isRequired,
};

const ResetPassword = withFormik({
  mapPropsToValues: () => ({
    email: '',
  }),
  handleChange: (e, { props }) => customHandleChange(e, props),
  // Custom sync validation
  validate: (values) => {
    const errors = {};
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
})(ResetPasswordForm);

export default ResetPassword;
