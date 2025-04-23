import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

const BusSeatSelection = ({ seats }) => {
  const dispatch = useDispatch();
  const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);

  const handleSelect = (seatId) => {
    dispatch(selectTransportSeat(seatId));
  };
  
  if (!seats || !Array.isArray(seats)) {
    return <Typography variant="body1">No seats available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {seats.map((seat) => (
        <Grid item xs={12} sm={6} key={seat.seatId}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: selectedSeatId === seat.seatId ? '#e0f7fa' : '#fff',
            }}
          >
            <Typography variant="h6">Seat {seat.seatNumber}</Typography>
            <Typography>Class: {seat.classType}</Typography>
            <Typography>Status: {seat.status}</Typography>
            <Button
              variant="contained"
              color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
              disabled={seat.status === 'Booked'}
              onClick={() => handleSelect(seat.seatId)}
            >
              {seat.status === 'Booked'
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

export default BusSeatSelection;