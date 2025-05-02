import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import rawCountryCodes from '../assets/countryPhoneCodes.json';
import '../assets/styles/account.scss'; 
import {
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} from '../redux/actions/userActionTypes';

const countryPhoneCodes = Object.entries(rawCountryCodes).map(([code, number]) => ({
  code,
  dial_code: number.startsWith('+') ? number : `+${number}`,
}));

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error, updateSuccess } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    mobileNumber: '',
    countryCode: '+91',
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        userEmail: userInfo.userEmail || '',
        mobileNumber: userInfo.mobileNumber || '',
        countryCode: userInfo.countryCode || '+91',
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateMobileNumber = () => {
    return /^\d+$/.test(formData.mobileNumber) && formData.mobileNumber.length >= 7;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateMobileNumber()) {
      alert('Please enter a valid mobile number.');
      return;
    }

    try {
      dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

      const response = await axios.put(`https://localhost:8443/users/${userInfo.id}`, formData);

      dispatch({
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: USER_PROFILE_UPDATE_FAIL,
        payload: err.response?.data?.message || 'Update failed',
      });
    }
  };

  return (
    <Paper className="my-account-container" elevation={4}>
      <Typography variant="h5" className="my-account-title" width={1000} gutterBottom>
        My Account
      </Typography>

      <form onSubmit={handleUpdate} className="my-account-form">
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="userEmail"
          type="email"
          value={formData.userEmail}
          onChange={handleChange}
          required
          fullWidth
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            options={countryPhoneCodes}
            getOptionLabel={(option) => `${option.dial_code} (${option.code})`}
            isOptionEqualToValue={(option, value) => option.dial_code === value.dial_code}
            value={countryPhoneCodes.find((c) => c.dial_code === formData.countryCode) || null}
            onChange={(event, newValue) => {
              setFormData((prev) => ({
                ...prev,
                countryCode: newValue ? newValue.dial_code : '',
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Country Code" required />
            )}
            sx={{ minWidth: 140 }}
          />

          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            sx={{ flex: 1 }}
            error={!validateMobileNumber()}
            helperText={!validateMobileNumber() ? 'Invalid mobile number' : ''}
          />
        </Box>

        <Box className="action-buttons">
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            className="update-button"
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
            fullWidth
            className="back-button"
          >
            Back
          </Button>
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        {updateSuccess && <Typography className="success-message">Profile updated successfully!</Typography>}
      </form>
    </Paper>
  );
};

export default MyAccount;


