import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Link as MuiLink, Typography } from '@mui/material';
import { fetchResendConfirmation } from '../../store/auth/authSlice';

function ConfirmationError() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { confirmation, isLoading, message } = useSelector((state) => state.auth);
  console.log('confirmation ===> ', confirmation, isLoading);
  const resendConfirmation = () => {
    dispatch(fetchResendConfirmation({ email: id }));
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        {' '}
        { message }
        {' '}
      </Typography>
      <Grid container>
        <Grid item xs="12">
          <MuiLink href="#" variant="body2" onClick={() => resendConfirmation()}>
            Didnt receive confirmation email? Click to resend now
          </MuiLink>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConfirmationError;
