import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import MobileNumberForm from '../components/MobileNumberForm'; // Import the MobileNumberForm component
import { useTheme } from '@mui/material/styles';

const Login = () =>{
    const theme = useTheme();
    return <AppProvider theme={theme}>
                <h1>Login</h1>
                <MobileNumberForm />
            </AppProvider>;
}

export default Login;

