import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Link as MuiLink, Typography } from '@mui/material';
import { fetchResendConfirmation } from '../../store/auth/authSlice';

function ConfirmationError() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { confirmation, isLoading } = useSelector((state) => state.auth);
  console.log('confirmation ===> ', confirmation, isLoading, id);
  const resendConfirmation = () => {
    dispatch(fetchResendConfirmation(id));
  };

  return (
    <div>
      <Grid container>
        <Grid item xs="12">
          <Typography component="h1" variant="h5">
            the token in the email you used is expired or invalid!
          </Typography>
        </Grid>
        <Grid item xs="12">
          <MuiLink href="#" variant="body2" onClick={() => resendConfirmation()}>
            Click to resend a new confirmation email now!
          </MuiLink>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConfirmationError;
