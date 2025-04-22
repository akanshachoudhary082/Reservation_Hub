import React from 'react';
import MobileNumberForm from '../components/MobileNumberForm';
import EmailPasswordForm from '../components/EmailPasswordForm';
import { Box, Typography, Divider } from '@mui/material';

const Login = () => {
  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <MobileNumberForm />

      <Divider sx={{ my: 4 }}>OR</Divider>

      <EmailPasswordForm />
    </Box>
  );
};

export default Login;


