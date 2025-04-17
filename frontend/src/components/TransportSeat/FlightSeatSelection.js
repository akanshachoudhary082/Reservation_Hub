import React, { useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

const FlightSeatSelection = ({ seats = [] }) => {
  const dispatch = useDispatch();
  const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);

  useEffect(() => {
    console.log('🚀 Seats received in FlightSeatSelection:', seats); 
  }, [seats]);

  const handleSelect = (seatId) => {
    dispatch(selectTransportSeat(seatId));
  };

  if (!seats || seats.length === 0) {
    return <Typography>No available seats.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {seats.map((seat) => (
        <Grid item xs={12} sm={6} md={4} key={seat.seatId}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: selectedSeatId === seat.seatId ? '#fce4ec' : '#fff',
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">Seat {seat.seatNumber}</Typography>
            <Typography>Class: {seat.classType}</Typography>
            <Typography>Type: {seat.seatType}</Typography>
            <Typography>Status: {seat.status}</Typography>
            <Typography>Service ID: {seat.serviceDetailsId}</Typography>

            <Button
              variant="contained"
              color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
              disabled={seat.status?.toUpperCase() === 'BOOKED'}
              onClick={() => handleSelect(seat.seatId)}
              sx={{ marginTop: 2 }}
            >
              {seat.status?.toUpperCase() === 'BOOKED'
                ? 'Booked'
                : selectedSeatId === seat.seatId
                ? 'Selected'
                : 'Select Seat'}
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default FlightSeatSelection;
