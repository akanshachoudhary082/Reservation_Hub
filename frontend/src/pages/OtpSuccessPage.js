// src/components/SuccessPage.js
import React from 'react';
import { Typography } from '@mui/material';

const OtpSuccessPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4">OTP Verified Successfully!</Typography>
            <Typography variant="body1">You can now access your account.</Typography>
        </div>
    );
};

export default OtpSuccessPage;