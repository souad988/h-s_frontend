import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import {
  Box, Typography, Container, CssBaseline, Avatar, TextField, Button, Grid, Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fetchResetPasswordLink } from '../../store/auth/authSlice';
import '../../styles/index.css';
import { customHandleChange } from './authform';

const ResetPasswordLinkForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    confirmation,
  } = props;
  const dispatch = useDispatch();
  const {
    message, isLogedin, confirmed,
  } = useSelector((state) => state.auth);
  console.log('reset password ===> ', message, confirmed);

  const handleSubmit = (values, e) => {
    e.preventDefault();
    dispatch(fetchResetPasswordLink(values.email));
  };

  const isDisabled = () => !values.email || Object.keys(errors).length > 0;

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
            Forgot Password
          </Typography>
          { confirmation && confirmation.length > 0 && <div className="error_message">{confirmation}</div>}
          { message && !isLogedin ? <div className="error_message">{message}</div> : <div className="fulfilled_message">{message}</div>}
        </Box>
        <Box component="form" onSubmit={(e) => handleSubmit(values, e)} sx={{ mt: 1 }}>
          <Typography variant="body">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</Typography>
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

ResetPasswordLinkForm.propTypes = {
  confirmation: PropTypes.string.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    // Define the expected types for each property in the 'values' object
    // These should align with the actual data structure in your application
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    // Define the expected types for each property in the 'touched' object
    // These should align with the actual data structure in your application
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    // Define the expected types for each property in the 'errors' object
    // These should align with the actual data structure in your application
  }).isRequired,
  handleBlur: PropTypes.func.isRequired,
};

const ResetPasswordLink = withFormik({
  mapPropsToValues: () => ({
    email: '',
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
    return errors;
  },
  displayName: 'BasicForm',
})(ResetPasswordLinkForm);

export default ResetPasswordLink;
