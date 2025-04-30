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
//     <Grid container spacing={2} sx={{ padding: 2 }}>
//       {seats.map((seat) => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={seat.seatId}>
//           <Paper
//             sx={{
//               padding: 2,
//               borderRadius: 4,
//               backgroundColor:
//                 selectedSeatId === seat.seatId
//                   ? '#4caf50'  // Green for selected
//                   : seat.status === 'Booked'
//                   ? '#e0e0e0'  // Grey for booked
//                   : '#fff',    // White for available
//               boxShadow: 2,
//               '&:hover': {
//                 cursor: seat.status !== 'Booked' ? 'pointer' : 'not-allowed',
//                 boxShadow: 6,
//               },
//             }}
//           >
//             <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//               Seat {seat.seatNumber}
//             </Typography>
//             <Typography sx={{ textAlign: 'center', color: 'gray' }}>Class: {seat.classType}</Typography>
//             <Typography sx={{ textAlign: 'center', color: 'gray' }}>Status: {seat.status}</Typography>

//             <Button
//               variant="contained"
//               color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
//               disabled={seat.status === 'Booked'}
//               onClick={() => handleSelect(seat.seatId)}
//               sx={{
//                 width: '100%',
//                 marginTop: 2,
//                 backgroundColor: seat.status === 'Booked' ? '#9e9e9e' : undefined,
//                 '&:hover': {
//                   backgroundColor: seat.status === 'Booked' ? '#9e9e9e' : undefined,
//                 },
//               }}
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

// import React, { useState } from 'react';
// import { Button, Grid, Paper, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const TrainSeatSelection = ({ seats }) => {
//   const dispatch = useDispatch();
//   const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);
//   const [selectedClass, setSelectedClass] = useState(null);

//   const classTypesToShow = ['GENERAL', 'SLEEPER', 'FIRST_AC', 'SECOND_AC', 'THIRD_AC'];

//   if (!seats || !Array.isArray(seats)) {
//     return <Typography variant="body1">No seats available.</Typography>;
//   }

//   const handleSelect = (seatId) => {
//     dispatch(selectTransportSeat(seatId));
//   };

//   const handleClassClick = (classType) => {
//     setSelectedClass(classType);
//   };

//   const filteredSeats = seats.filter(seat => classTypesToShow.includes(seat.classType));

//   const classStats = classTypesToShow.map((classType) => {
//     const seatsOfClass = filteredSeats.filter(seat => seat.classType === classType);
//     const available = seatsOfClass.filter(seat => seat.status === 'AVAILABLE').length;
//     const total = seatsOfClass.length;
//     return { classType, available, total };
//   });

//   const seatsToShow = selectedClass
//     ? filteredSeats.filter(seat => seat.classType === selectedClass && seat.status === 'AVAILABLE')
//     : [];

//   return (
//     <Grid container spacing={2} sx={{ padding: 2 }}>
//       {!selectedClass ? (
//         classStats.map(({ classType, available, total }) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={classType}>
//             <Paper
//               sx={{
//                 padding: 2,
//                 borderRadius: 4,
//                 backgroundColor: '#e3f2fd',
//                 boxShadow: 3,
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 '&:hover': { boxShadow: 6, backgroundColor: '#bbdefb' }
//               }}
//               onClick={() => handleClassClick(classType)}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
//                 {classType.replace('_', ' ')}
//               </Typography>
//               <Typography variant="body2" sx={{ marginTop: 1 }}>
//                 Total Seats: <strong>{total}</strong>
//               </Typography>
//               <Typography variant="body2">
//                 Available Seats: <strong>{available}</strong>
//               </Typography>
//             </Paper>
//           </Grid>
//         ))
//       ) : (
//         <>
//           <Grid item xs={12}>
//             <Button variant="outlined" onClick={() => setSelectedClass(null)}>
//               Back to Class View
//             </Button>
//           </Grid>
//           {seatsToShow.length === 0 ? (
//             <Grid item xs={12}>
//               <Typography>No available seats in {selectedClass} class.</Typography>
//             </Grid>
//           ) : (
//             seatsToShow.map((seat) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={seat.seatId}>
//                 <Paper
//                   sx={{
//                     padding: 2,
//                     borderRadius: 4,
//                     backgroundColor: selectedSeatId === seat.seatId ? '#4caf50' : '#fff',
//                     boxShadow: 2,
//                     '&:hover': {
//                       cursor: 'pointer',
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//                     Seat {seat.seatNumber}
//                   </Typography>
//                   <Typography sx={{ textAlign: 'center', color: 'gray' }}>
//                     Class: {seat.classType}
//                   </Typography>
//                   <Typography sx={{ textAlign: 'center', color: 'gray' }}>
//                     Status: {seat.status}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
//                     onClick={() => handleSelect(seat.seatId)}
//                     sx={{ width: '100%', marginTop: 2 }}
//                   >
//                     {selectedSeatId === seat.seatId ? 'Selected' : 'Select Seat'}
//                   </Button>
//                 </Paper>
//               </Grid>
//             ))
//           )}
//         </>
//       )}
//     </Grid>
//   );
// };

// export default TrainSeatSelection;


import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

const TrainSeatSelection = ({ seats }) => {
  const dispatch = useDispatch();
  const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);
  const [selectedClass, setSelectedClass] = useState(null);

  const classTypesToShow = ['GENERAL', 'SLEEPER', 'FIRST_AC', 'SECOND_AC', 'THIRD_AC'];

  if (!seats || !Array.isArray(seats)) {
    return <Typography variant="body1">No seats available.</Typography>;
  }

  const handleSelect = (seatId) => {
    dispatch(selectTransportSeat(seatId));
  };

  const handleClassClick = (classType) => {
    setSelectedClass(classType);
  };

  const filteredSeats = seats.filter(seat => classTypesToShow.includes(seat.classType));

  const classStats = classTypesToShow.map((classType) => {
    const seatsOfClass = filteredSeats.filter(seat => seat.classType === classType);
    const available = seatsOfClass.filter(seat => seat.status === 'AVAILABLE').length;
    const total = seatsOfClass.length;
    return { classType, available, total };
  });

  const seatsToShow = selectedClass
    ? filteredSeats.filter(seat => seat.classType === selectedClass && seat.status === 'AVAILABLE')
    : [];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Class Cards */}
        {!selectedClass ? (
          classStats.map(({ classType, available, total }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={classType}>
              <Paper
                sx={{
                  padding: 4, // Increased padding for larger cards
                  minHeight: 220, // Height control
                  width: '100%',  // Use full width of grid item
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  backgroundColor: '#e3f2fd',
                  boxShadow: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: 8,
                    backgroundColor: '#bbdefb',
                    transform: 'scale(1.05)',
                  }
                }}
                onClick={() => handleClassClick(classType)}
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
              </Paper>
            </Grid>
          ))
        ) : (
          <>
            {/* Back to Class View Button */}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={() => setSelectedClass(null)}>
                Back to Class View
              </Button>
            </Grid>

            {/* Seats of the Selected Class */}
            {seatsToShow.length === 0 ? (
              <Grid item xs={12}>
                <Typography>No available seats in {selectedClass} class.</Typography>
              </Grid>
            ) : (
              seatsToShow.map((seat) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={seat.seatId}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 4,
                      backgroundColor: selectedSeatId === seat.seatId ? '#4caf50' : '#fff',
                      boxShadow: 2,
                      '&:hover': {
                        cursor: 'pointer',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Seat {seat.seatNumber}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', color: 'gray' }}>
                      Class: {seat.classType}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', color: 'gray' }}>
                      Status: {seat.status}
                    </Typography>

                    <Button
                      variant="contained"
                      color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
                      onClick={() => handleSelect(seat.seatId)}
                      sx={{ width: '100%', marginTop: 2 }}
                    >
                      {selectedSeatId === seat.seatId ? 'Selected' : 'Select Seat'}
                    </Button>
                  </Paper>
                </Grid>
              ))
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default TrainSeatSelection;
