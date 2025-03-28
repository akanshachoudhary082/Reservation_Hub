// src/pages/SignIn.js
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import MobileNumberForm from '../components/MobileNumberForm'; // Import the MobileNumberForm component

const SignIn = () => {
    const theme = useTheme();

    return (
        <AppProvider theme={theme}>
            <h1>Login</h1>
            <MobileNumberForm />
        </AppProvider>
    );
};

export default SignIn;