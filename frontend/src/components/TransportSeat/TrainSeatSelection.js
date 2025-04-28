// import React from 'react';
// import { Button, Grid, Paper, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const TrainSeatSelection = ({ seats }) => {
//   const dispatch = useDispatch();
//   const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);

//   const handleSelect = (seatId) => {
//     dispatch(selectTransportSeat(seatId));
//   };

//   if (!seats || !Array.isArray(seats)) {
//     return <Typography variant="body1">No seats available.</Typography>;
//   }

//   return (
//     <Grid container spacing={2}>
//       {seats.map((seat) => (
//         <Grid item xs={12} sm={6} key={seat.seatId}>
//           <Paper
//             sx={{
//               padding: 2,
//               borderRadius: 2,
//               backgroundColor: selectedSeatId === seat.seatId ? '#e3f2fd' : '#fff',
//             }}
//           >
//             <Typography variant="h6">Seat {seat.seatNumber}</Typography>
//             <Typography>Class: {seat.classType}</Typography>
//             <Typography>Status: {seat.status}</Typography>
//             <Button
//               variant="contained"
//               color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
//               disabled={seat.status === 'Booked'}
//               onClick={() => handleSelect(seat.seatId)}
//             >
//               {seat.status === 'Booked'
//                 ? 'Booked'
//                 : selectedSeatId === seat.seatId
//                 ? 'Selected'
//                 : 'Select Seat'}
//             </Button>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TrainSeatSelection;


import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

const TrainSeatSelection = ({ seats }) => {
  const dispatch = useDispatch();
  const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);

  const handleSelect = (seatId) => {
    dispatch(selectTransportSeat(seatId));
  };

  if (!seats || !Array.isArray(seats)) {
    return <Typography variant="body1">No seats available.</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {seats.map((seat) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={seat.seatId}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 4,
              backgroundColor:
                selectedSeatId === seat.seatId
                  ? '#4caf50'  // Green for selected
                  : seat.status === 'Booked'
                  ? '#e0e0e0'  // Grey for booked
                  : '#fff',    // White for available
              boxShadow: 2,
              '&:hover': {
                cursor: seat.status !== 'Booked' ? 'pointer' : 'not-allowed',
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              Seat {seat.seatNumber}
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'gray' }}>Class: {seat.classType}</Typography>
            <Typography sx={{ textAlign: 'center', color: 'gray' }}>Status: {seat.status}</Typography>

            <Button
              variant="contained"
              color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
              disabled={seat.status === 'Booked'}
              onClick={() => handleSelect(seat.seatId)}
              sx={{
                width: '100%',
                marginTop: 2,
                backgroundColor: seat.status === 'Booked' ? '#9e9e9e' : undefined,
                '&:hover': {
                  backgroundColor: seat.status === 'Booked' ? '#9e9e9e' : undefined,
                },
              }}
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

export default TrainSeatSelection;
