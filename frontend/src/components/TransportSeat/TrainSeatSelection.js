import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';
import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const TrainSeatSelection = ({ seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const classTypesToShow = ['GENERAL', 'SLEEPER', 'FIRST_AC', 'SECOND_AC', 'THIRD_AC'];

  if (!seats || !Array.isArray(seats)) {
    return <Typography variant="body1">No seats available.</Typography>;
  }

  const seatPrices = {
    GENERAL: 100,
    SLEEPER: 150,
    FIRST_AC: 500,
    SECOND_AC: 350,
    THIRD_AC: 200,
  };

  // Handle seat selection
  const handleSelect = (classType, seat) => {
    const seatPrice = seatPrices[classType] || 0;

    const newSeat = {
      id: `${classType}-${seat.seatNumber}`,
      classType,
      seatNumber: seat.seatNumber,
      price: seatPrice,
    };

    const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.id === newSeat.id);
    let updatedSeats = [...selectedSeats];
    let updatedPrice = totalPrice;

    if (!isSelected) {
      updatedSeats = [...selectedSeats, newSeat];
      updatedPrice += seatPrice;
    } else {
      updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat.id !== newSeat.id);
      updatedPrice -= seatPrice;
    }

    setSelectedSeats(updatedSeats);
    setTotalPrice(updatedPrice);

    dispatch(selectTransportSeat(newSeat));
  };

  const renderSelectedSeatNumbers = () => {
    const grouped = selectedSeats.reduce((acc, seat) => {
      const label = seat.classType.replace('_', ' ');
      if (!acc[label]) acc[label] = [];
      acc[label].push(seat.seatNumber || seat.id);
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([type, numbers]) => `${type} [${numbers.join(', ')}]`)
      .join(', ');
  };

  const filteredSeats = seats.filter(seat => classTypesToShow.includes(seat.classType));

  const classStats = classTypesToShow.map((classType) => {
    const seatsOfClass = filteredSeats.filter(seat => seat.classType === classType);
    const available = seatsOfClass.filter(seat => seat.status === 'AVAILABLE').length;
    const total = seatsOfClass.length;
    return { classType, available, total };
  });

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
      <Grid container spacing={3} sx={{ padding: 3, display: 'flex', justifyContent: 'space-evenly' }}>
        {classStats.map(({ classType, available, total }) => {
          const seatWithPrice = filteredSeats.find(seat => seat.classType === classType && seat.status === 'AVAILABLE');
          const price = seatWithPrice ? seatWithPrice.price : 0;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={classType} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                sx={{
                  padding: 4,
                  minHeight: 100, // Increased height for better card display
                  width: '350%', // Increased width to extend the card
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  backgroundColor: '#e3f2fd',
                  boxShadow: 4,
                  textAlign: 'center',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: 8,
                    backgroundColor: '#bbdefb',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {classType.replace('_', ' ')}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Total Seats: <strong>{total}</strong>
                </Typography>
                <Typography variant="body1">
                  Available Seats: <strong>{available}</strong>
                </Typography>

                <IconButton
                  onClick={() => {
                    const selectedSeat = filteredSeats.find(
                      seat => seat.classType === classType && seat.status === 'AVAILABLE'
                    );
                    if (selectedSeat) handleSelect(classType, selectedSeat);
                  }}
                  sx={{ marginTop: 2, width: '100%' }}
                >
                  <AddIcon sx={{ fontSize: 30 }} />
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    Select seats
                  </Typography>
                </IconButton>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Show total price and selected seat details below the cards */}
      {selectedSeats.length > 0 && (
        <Box className="selected-seats-container" sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Selected Seats: {selectedSeats.length}
          </Typography>
          
          <Typography variant="body1">Total Price: ₹{totalPrice.toFixed(2)}</Typography>
          <Typography variant="body1">Seat Types: {renderSelectedSeatNumbers()}</Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() =>
              navigate('/transport-booking', {
                state: { selectedSeats, totalPrice }
              })
            }
          >
            Proceed
          </Button>
        </Box>
      )}
    </div>
  );
};

export default TrainSeatSelection;
