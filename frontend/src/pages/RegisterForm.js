import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../redux/actions/userActionTypes';
import axios from 'axios';
import countryPhoneCodes from '../assets/countryPhoneCodes.json';
import '../assets/styles/register.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const countryOptions = Object.entries(countryPhoneCodes).map(([code, dial]) => ({
    code,
    dial_code: dial.startsWith('+') ? dial : `+${dial}`,
  }));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+91',
    mobileNumber: '',
    userEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (['password', 'confirmPassword'].includes(name)) setPasswordError('');
    if (name === 'mobileNumber') setMobileError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setMobileError('Mobile number must be exactly 10 digits');
      return;
    }

    if (captchaInput.trim() !== captcha) {
      setCaptchaError('Captcha does not match');
      return;
    }

    const { confirmPassword, countryCode, mobileNumber, ...rest } = formData;
    const payload = {
      ...rest,
      mobileNumber: `${countryCode}${mobileNumber}`,
    };

    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const response = await axios.post('/users/register', payload);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response?.data?.message || 'Registration failed',
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/my-account');
    }
  }, [userInfo, navigate]);

  return (
    <div className="register-page">
      <div className="register-container">
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Autocomplete
              options={countryOptions}
              getOptionLabel={(option) => `${option.dial_code} (${option.code})`}
              isOptionEqualToValue={(option, value) =>
                option.dial_code === value.dial_code
              }
              value={
                countryOptions.find(
                  (c) => c.dial_code === formData.countryCode
                ) || null
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  countryCode: newValue ? newValue.dial_code : '',
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country Code" required />
              )}
              sx={{ minWidth: 150 }}
            />

            <TextField
              label="Mobile Number"
              name="mobileNumber"
              required
              fullWidth
              value={formData.mobileNumber}
              onChange={handleChange}
              error={!!mobileError}
              helperText={mobileError}
              inputProps={{ maxLength: 10 }}
            />
          </Box>

          <TextField
            label="Email"
            name="userEmail"
            type="email"
            required
            value={formData.userEmail}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordError && <Typography color="error">{passwordError}</Typography>}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '#f0f0f0',
                p: 1,
                letterSpacing: 2,
                fontFamily: 'monospace',
              }}
            >
              {captcha}
            </Typography>
            <Button onClick={refreshCaptcha} variant="outlined">
              Refresh
            </Button>
          </Box>

          <TextField
            label="Enter Captcha"
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setCaptchaError('');
            }}
            required
            error={!!captchaError}
            helperText={captchaError}
          />

          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </div>
    </div>
  );
};

export default RegisterForm;
