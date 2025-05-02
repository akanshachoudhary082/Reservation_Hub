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
        width: '200%',
        maxWidth: 1000, // Ensures it doesn’t grow too wide on large screens
        margin: '0 auto',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        marginBottom: '40px',
        marginTop:'40px',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <MobileNumberForm />  
      <Divider sx={{ my: 4 }}>OR</Divider>
      <EmailPasswordForm />  
      
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography variant="body2">
          Don't have an account? 
          <Link 
            component="button" 
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={handleSignUpRedirect}  
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

