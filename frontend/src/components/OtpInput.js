// src/components/OtpInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for routing
import { verifyotpAction } from '../redux/actions/verifyotpAction'; // Import the action to verify OTP
//import '../assets/styles/OtpInput.scss'; // Import the SCSS file
import { Button, TextField, Typography } from '@mui/material'; // Import Material UI components


const OtpInput = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate OTP (you can add more validation if needed)
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            setLoading(false);
            return;
        }

        try {
            await dispatch(verifyotpAction(otp)); // Dispatch the action to verify OTP
            navigate('/success'); // Redirect to a success page or dashboard
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-input">
            <Typography variant="h4">Enter OTP</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="OTP"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: '16px' }} // Space below the input field
                />
                {error && <Typography className="error-message">{error}</Typography>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-button"
                    disabled={loading}
                    style={{ marginTop: '16px' }} // Ensure spacing above the button
                >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
            </form>
        </div>
    );
};

export default OtpInput;