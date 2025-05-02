import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setTransportData, setError } from '../redux/actions/transportActions';
import Cookies from 'js-cookie'; // Import js-cookie to get the token
import axios from 'axios';
import { TextField, Button, Grid, Typography, Container, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const TransportPaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Retrieve the booking data from the location state passed during redirection
  const { bookingData, totalPrice, bookingId } = location.state || {};
  const [paymentData, setPaymentData] = useState({
    amount: totalPrice || 0,
    paymentMethod: '',
    paymentStatus: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(setLoading()); // Start loading

    const token = Cookies.get('jwtToken');
    if (!token) {
      setErrorMessage('Authentication token is missing.');
      return;
    }

    try {
      // Include booking data in the payment request
      const response = await axios.post('/transport-payments', {
        ...paymentData,
        bookingId, // Send the booking ID
        seats: bookingData.seats, // Send the seats data
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      dispatch(setTransportData(response.data)); // Dispatch payment details
    } catch (error) {
      dispatch(setError(error.message)); // Dispatch error if payment fails
      setErrorMessage(error.message); // Display error to the user
    }
  };

  useEffect(() => {
    if (!bookingData) {
      setErrorMessage('Booking data is missing.');
    }
  }, [bookingData]);

  return (
    <Container sx={{ backgroundColor: 'white', padding: 4 }}>
      <Typography variant="h4" gutterBottom color="black">
        Transport Payment
      </Typography>

      {/* Display booking information */}
      {bookingData && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Booking Details</Typography>
          <Typography variant="body1">Booking ID: {bookingId}</Typography>
          <Typography variant="body1">Total Price: ₹{totalPrice.toFixed(2)}</Typography>
          <Typography variant="body1">Seats: </Typography>
          <ul>
            {bookingData.seats.map((seat, index) => (
              <li key={index}>
                Seat {seat.seatNumber} - {seat.seatType} - {seat.passengerName}
              </li>
            ))}
          </ul>
        </Box>
      )}

      <form onSubmit={handlePayment}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              InputLabelProps={{
                style: { color: 'black' }
              }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Payment Method"
              fullWidth
              variant="outlined"
              value={paymentData.paymentMethod}
              onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
              InputLabelProps={{
                style: { color: 'black' }
              }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Payment Status"
              fullWidth
              variant="outlined"
              value={paymentData.paymentStatus}
              onChange={(e) => setPaymentData({ ...paymentData, paymentStatus: e.target.value })}
              InputLabelProps={{
                style: { color: 'black' }
              }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ color: 'white' }}
            >
              Submit Payment
            </Button>
          </Grid>
        </Grid>
      </form>

      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </Container>
  );
};

export default TransportPaymentPage;
