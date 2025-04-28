import React from 'react';
import MobileNumberForm from '../components/MobileNumberForm';
import EmailPasswordForm from '../components/EmailPasswordForm';
import { Box, Typography, Divider, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Hook for navigation

const Login = () => {
  const navigate = useNavigate();  

  const handleSignUpRedirect = () => {
    navigate('/register');  
  };

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

      <MobileNumberForm />  {/* Login form component for mobile number */}
      <Divider sx={{ my: 4 }}>OR</Divider>
      <EmailPasswordForm />  {/* Login form component for email/password */}

      {/* Sign Up Link */}
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography variant="body2">
          Don't have an account? 
          <Link 
            component="button" 
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={handleSignUpRedirect}  // Handle the redirection
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

