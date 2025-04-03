import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyotpAction } from '../redux/actions/verifyotpAction'; 
import { Button, Typography } from '@mui/material'; 
import '../assets/styles/OtpInput.scss'; // Import the SCSS file

const OtpInput = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for each digit
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only keep the last character
        setOtp(newOtp);

        // Move to the next input if the current one is filled
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            setLoading(false);
            return;
        }

        try {
            await dispatch(verifyotpAction(otpString)); 
            navigate('/success');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-container">
            <div className="otp-input">
                <div className="text-box">
                    <Typography variant="h4">Enter OTP</Typography>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="input-container">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className={`input-box ${error ? 'error' : ''}`}
                            />
                        ))}
                    </div>
                    {error && <Typography className="error-message">{error}</Typography>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="submit-button"
                        disabled={loading}
                        style={{ marginTop: '16px' }} 
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default OtpInput;