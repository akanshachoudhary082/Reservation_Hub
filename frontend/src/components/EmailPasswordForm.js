import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; //  Import js-cookie
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmailPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value.trim());
  const handlePasswordChange = (e) => setPassword(e.target.value.trim());

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    //  Define the payload with email and password
    const payload = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    axios
      .post(
        'https://localhost:8443/users/signin', // Replace with your actual URL
        payload,
        {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      )
      .then(async(response) => {
        debugger
        setErrorMessage('');
        setSuccessMessageOpen(true);

        
        const token = await response.data.jwt;

        console.log('token---',token,response);
        
        if (token) {
          await Cookies.set('jwtToken', token,{ expires: 1 }); // Store token for 1 day

        }
        if(response?.status == 200){
          await navigate('/home')
        }

      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setErrorMessage('Login failed: ' + error.response.data.message);
        } else {
          setErrorMessage('An error occurred, please try again');
        }
      });
  };

  return (
    <>
      {/* Email Input */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        required
      />

      {/* Password Input */}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      {/* Error message display */}
      {errorMessage && (
        <Typography color="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Login Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmailPasswordForm;
