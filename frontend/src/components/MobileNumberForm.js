import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser  } from '../redux/actions/loginAction'; 
import '../assets/styles/MobileNumberForm.scss'; 
import { Button, TextField, Typography } from '@mui/material'; 
import '../assets/styles/style.scss';

const countryList = [
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
    { code: 'AU', name: 'Australia', dialCode: '+61' },
   
];

const MobileNumberForm = () => {
    const dispatch = useDispatch();
    const [inputNumber, setInputNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countryList[0]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputNumber(e.target.value);
    };

    const handleCountryChange = (e) => {
        const selected = countryList.find(country => country.code === e.target.value);
        setSelectedCountry(selected);
    };

    const validateMobileNumber = (number) => {
        const regex = /^[0-9]{10}$/; 
        return regex.test(number);
    };

    const getOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validateMobileNumber(inputNumber)) {
            setError('Please enter a valid mobile number');
            setLoading(false);
            return; 
        }

        try {
            navigate('/otp-sent');
            const fullNumber = selectedCountry.dialCode + inputNumber; 
            await dispatch(loginUser(fullNumber)); 
             
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div >
            <div className="mobile-number-form">
            <Typography variant="h4">Enter your mobile number</Typography>
            <form onSubmit={getOtp} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <select onChange={handleCountryChange} value={selectedCountry.code} style={{ marginBottom: '16px' }}>
                    {countryList.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name} {country.dialCode}
                        </option>
                    ))}
                </select>
                <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    value={inputNumber}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: '16px' }} 
                />
                {error && <Typography className="error-message">{error}</Typography>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-button"
                    disabled={loading}
                    style={{ marginTop: '16px' }} 
                >
                    {loading ? 'Sending...' : 'Send OTP'}
                </Button>
            </form>
        </div>
        </div>
    );
};

export default MobileNumberForm;