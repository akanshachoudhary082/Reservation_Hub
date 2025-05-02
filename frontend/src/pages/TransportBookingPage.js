import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';

const TransportBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats = [], totalPrice = 0 } = location.state || {};

  const [contact, setContact] = useState({
    email: '',
    phone: '',
    countryCode: '+91',
    state: '',
  });
  const [passengerNames, setPassengerNames] = useState(
    Array(selectedSeats.length).fill('')
  );
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (!token) {
      setError('You must be logged in to book.');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUserData({
        userId: decoded.user_id,
        userName: decoded.user_name,
        userEmail: decoded.user_email,
      });
      setContact((prev) => ({ ...prev, email: decoded.user_email }));
    } catch (e) {
      setError('Invalid authentication token.');
    }
  }, []);

  const handlePassengerNameChange = (index, value) => {
    const updated = [...passengerNames];
    updated[index] = value;
    setPassengerNames(updated);
  };

  const proceedToPayment = () => {
    if (!userData?.userId) {
      setError('User information missing.');
      return;
    }

    if (passengerNames.some((name) => !name.trim())) {
      setError('Please enter all passenger names.');
      return;
    }

    const seatsData = selectedSeats.map((seat, i) => ({
      seatId: seat.seatId,
      detailId: seat.detailId, 
      seatNumber: seat.seatNumber,
      seatType: seat.seatType,
      classType: seat.classType,
      status: seat.status,
      seatPrice: seat.seatPrice,
      passengerName: passengerNames[i],
      serviceId: seat.serviceId, 
    }));

    const bookingData = {
      userId: userData.userId,
      passengerName: passengerNames.join(', '),
      mobileNumber: `${contact.countryCode}${contact.phone}`,
      userEmail: contact.email,
      status: 'PENDING',
      stateResidency: contact.state,
      bookingDate: new Date().toISOString(),
      seats: seatsData,
      totalPrice,
      bookingId: new Date().getTime(), 
    };

    
    navigate('/transport-payment', {
      state: {
        bookingData,
        totalPrice,
        bookingId: bookingData.bookingId,
        seatsData, 
      },
    });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 ,marginTop:'20px', marginBottom:'30px'}}>
      <Typography variant="h4" gutterBottom>Transport Ticket Booking</Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Contact Information</Typography>
          <TextField
            fullWidth label="Email" type="email" value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })} sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Country Code</InputLabel>
                <Select
                  value={contact.countryCode} label="Country Code"
                  onChange={(e) => setContact({ ...contact, countryCode: e.target.value })}
                >
                  <MenuItem value="+91">+91 (India)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth label="Phone" value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth label="State of Residence" value={contact.state}
            onChange={(e) => setContact({ ...contact, state: e.target.value })} sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {selectedSeats.map((seat, index) => (
        <Card key={seat.seatId} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Passenger {index + 1} — Seat {seat.seatNumber}
            </Typography>
            <TextField
              fullWidth label="Passenger Name" value={passengerNames[index]}
              onChange={(e) => handlePassengerNameChange(index, e.target.value)}
            />
          </CardContent>
        </Card>
      ))}

      <Typography variant="h6" sx={{ mt: 3 }}>Total Price: ₹{totalPrice.toFixed(2)}</Typography>

      <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={proceedToPayment}>
        Proceed to Payment
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      )}
    </Box>
  );
};

export default TransportBookingPage;
