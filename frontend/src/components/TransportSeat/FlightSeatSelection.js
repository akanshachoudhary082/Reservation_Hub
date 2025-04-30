// import React, { useEffect } from 'react';
// import { Button, Grid, Paper, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const FlightSeatSelection = ({ seats = [] }) => {
//   const dispatch = useDispatch();
//   const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);

//   useEffect(() => {
//     console.log('🚀 Seats received in FlightSeatSelection:', seats); 
//   }, [seats]);

//   const handleSelect = (seatId) => {
//     dispatch(selectTransportSeat(seatId));
//   };

//   if (!seats || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   return (
//     <Grid container spacing={2}>
//       {seats.map((seat) => (
//         <Grid item xs={12} sm={6} md={4} key={seat.seatId}>
//           <Paper
//             sx={{
//               padding: 2,
//               borderRadius: 2,
//               backgroundColor: selectedSeatId === seat.seatId ? '#fce4ec' : '#fff',
//               boxShadow: 3,
//             }}
//           >
//             <Typography variant="h6">Seat {seat.seatNumber}</Typography>
//             <Typography>Class: {seat.classType}</Typography>
//             <Typography>Type: {seat.seatType}</Typography>
//             <Typography>Status: {seat.status}</Typography>
//             <Typography>Service ID: {seat.serviceDetailsId}</Typography>

//             <Button
//               variant="contained"
//               color={selectedSeatId === seat.seatId ? 'secondary' : 'primary'}
//               disabled={seat.status?.toUpperCase() === 'BOOKED'}
//               onClick={() => handleSelect(seat.seatId)}
//               sx={{ marginTop: 2 }}
//             >
//               {seat.status?.toUpperCase() === 'BOOKED'
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

// export default FlightSeatSelection;

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Paper, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const FlightSeatSelection = ({ seats = [] }) => {
//   const dispatch = useDispatch();
//   const selectedSeatId = useSelector((state) => state.transportSeats.selectedSeatId);
//   const [selectedSeat, setSelectedSeat] = useState(null);

//   useEffect(() => {
//     if (selectedSeatId) {
//       const seat = seats.find((s) => s.seatId === selectedSeatId);
//       setSelectedSeat(seat);
//     } else {
//       setSelectedSeat(null);
//     }
//   }, [selectedSeatId, seats]);

//   const handleSelect = (seatId) => {
//     if (selectedSeatId === seatId) {
//       dispatch(selectTransportSeat(null)); // Deselect if already selected
//     } else {
//       dispatch(selectTransportSeat(seatId)); // Select new seat
//     }
//   };

//   if (!seats || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   // Group into 3-3 layout rows
//   const seatRows = [];
//   for (let i = 0; i < seats.length; i += 6) {
//     seatRows.push(seats.slice(i, i + 6));
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       {/* Seat Layout */}
//       {seatRows.map((row, rowIndex) => {
//         const leftSeats = row.slice(0, 3);
//         const rightSeats = row.slice(3, 6);
//         const rowNumber = rowIndex + 1;

//         return (
//           <Box
//             key={rowIndex}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 2,
//             }}
//           >
//             {/* Left 3 seats */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {leftSeats.map((seat) => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeatId={selectedSeatId}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>

//             {/* Row Number */}
//             <Typography
//               variant="h6"
//               sx={{ marginX: 3, width: 30, textAlign: 'center' }}
//             >
//               {rowNumber}
//             </Typography>

//             {/* Right 3 seats (AISLE, MIDDLE, WINDOW) */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {rightSeats.map((seat) => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeatId={selectedSeatId}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>
//           </Box>
//         );
//       })}

//       {/* Selected Seat Info */}
//       {selectedSeat && (
//         <Box
//           sx={{
//             marginTop: 4,
//             padding: 2,
//             border: '1px solid #ccc',
//             borderRadius: 2,
//             maxWidth: 400,
//             marginX: 'auto',
//             textAlign: 'center',
//             backgroundColor: '#f9f9f9',
//           }}
//         >
//           <Typography variant="h6">Selected Seat Details</Typography>
//           <Typography>Seat Number: <strong>{selectedSeat.seatNumber}</strong></Typography>
//           <Typography>Seat Type: <strong>{selectedSeat.seatType}</strong></Typography>
//           <Typography>Class: <strong>{selectedSeat.classType}</strong></Typography>
//           <Typography>Price: <strong>₹{selectedSeat.seatPrice}</strong></Typography>
//           {/* Add icon */}
//           <IconButton
//             sx={{ marginTop: 2, backgroundColor: '#f06292', color: '#fff' }}
//             onClick={() => handleSelect(selectedSeat.seatId)}
//           >
//             <AddIcon />
//           </IconButton>
//         </Box>
//       )}
//     </Box>
//   );
// };

// const SeatCard = ({ seat, selectedSeatId, handleSelect }) => {
//   const isBooked = seat.status?.toUpperCase() === 'BOOKED';
//   const isSelected = selectedSeatId === seat.seatId;

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 1,
//         width: 80,
//         textAlign: 'center',
//         backgroundColor: isSelected ? '#fce4ec' : '#fff',
//         opacity: isBooked ? 0.5 : 1,
//         cursor: isBooked ? 'not-allowed' : 'pointer',
//         border: isSelected ? '2px solid #f06292' : '1px solid #ccc',
//       }}
//       onClick={() => !isBooked && handleSelect(seat.seatId)}
//     >
//       <Typography variant="subtitle1" fontWeight="bold">
//         {seat.seatNumber}
//       </Typography>
//       <Typography variant="caption">{seat.seatType}</Typography>
//     </Paper>
//   );
// };

// export default FlightSeatSelection; 


// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Paper, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const FlightSeatSelection = ({ seats = [] }) => {
//   const dispatch = useDispatch();
//   // Get selected seat ids from redux
//   const selectedSeatIds = useSelector((state) => state.transportSeats.selectedSeatIds);
//   const [selectedSeats, setSelectedSeats] = useState(selectedSeatIds);

//   // Toggle seat selection
//   const handleSelect = (seatId) => {
//     const updatedSeats = selectedSeats.includes(seatId)
//       ? selectedSeats.filter(id => id !== seatId)  // Unselect the seat if it's already selected
//       : [...selectedSeats, seatId];  // Select the seat if not selected

//     setSelectedSeats(updatedSeats); // Update local state
//     dispatch(selectTransportSeat(updatedSeats)); // Update redux state with selected seats
//   };

//   if (!seats || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   // Group into 3-3 layout rows
//   const seatRows = [];
//   for (let i = 0; i < seats.length; i += 6) {
//     seatRows.push(seats.slice(i, i + 6));
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       {/* Seat Layout */}
//       {seatRows.map((row, rowIndex) => {
//         const leftSeats = row.slice(0, 3);
//         const rightSeats = row.slice(3, 6);
//         const rowNumber = rowIndex + 1;

//         return (
//           <Box
//             key={rowIndex}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 2,
//             }}
//           >
//             {/* Left 3 seats */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {leftSeats.map((seat) => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeats={selectedSeats}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>

//             {/* Row Number */}
//             <Typography
//               variant="h6"
//               sx={{ marginX: 3, width: 30, textAlign: 'center' }}
//             >
//               {rowNumber}
//             </Typography>

//             {/* Right 3 seats */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {rightSeats.map((seat) => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeats={selectedSeats}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>
//           </Box>
//         );
//       })}

//       {/* Selected Seat Info */}
//       {selectedSeats.length > 0 && (
//         <Box
//           sx={{
//             marginTop: 4,
//             padding: 2,
//             border: '1px solid #ccc',
//             borderRadius: 2,
//             maxWidth: 400,
//             marginX: 'auto',
//             textAlign: 'center',
//             backgroundColor: '#f9f9f9',
//           }}
//         >
//           <Typography variant="h6">Selected Seat Details</Typography>
//           <Typography>Seats Selected: {selectedSeats.length}</Typography>
//           {/* Add icon to clear selection */}
//           <IconButton
//             sx={{ marginTop: 2, backgroundColor: '#f06292', color: '#fff' }}
//             onClick={() => handleSelect(selectedSeats[selectedSeats.length - 1])}
//           >
//             <AddIcon />
//           </IconButton>
//         </Box>
//       )}
//     </Box>
//   );
// };

// const SeatCard = ({ seat, selectedSeats, handleSelect }) => {
//   const isBooked = seat.status?.toUpperCase() === 'BOOKED';
//   const isSelected = selectedSeats.includes(seat.seatId);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 1,
//         width: 80,
//         textAlign: 'center',
//         backgroundColor: isSelected ? '#fce4ec' : '#fff',
//         opacity: isBooked ? 0.5 : 1,
//         cursor: isBooked ? 'not-allowed' : 'pointer',
//         border: isSelected ? '2px solid #f06292' : '1px solid #ccc',
//       }}
//       onClick={() => !isBooked && handleSelect(seat.seatId)} // Only select if not booked
//     >
//       <Typography variant="subtitle1" fontWeight="bold">
//         {seat.seatNumber}
//       </Typography>
//       <Typography variant="caption">{seat.seatType}</Typography>
//     </Paper>
//   );
// };

// export default FlightSeatSelection;


// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Paper, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const FlightSeatSelection = ({ seats = [] }) => {
//   const dispatch = useDispatch();
//   // Get selected seat ids from redux
//   const selectedSeatIds = useSelector((state) => state.transportSeats.selectedSeatIds);
//   const [selectedSeats, setSelectedSeats] = useState(selectedSeatIds || []); // Ensure it's an empty array if undefined

//   useEffect(() => {
//     if (selectedSeatIds) {
//       setSelectedSeats(selectedSeatIds); // Update selected seats if the redux state changes
//     }
//   }, [selectedSeatIds]);

//   // Guard clause: Check if seats is a valid array
//   if (!Array.isArray(seats) || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   // Toggle seat selection
//   const handleSelect = (seatId) => {
//     const updatedSeats = selectedSeats.includes(seatId)
//       ? selectedSeats.filter(id => id !== seatId)  // Unselect the seat if it's already selected
//       : [...selectedSeats, seatId];  // Select the seat if not selected

//     setSelectedSeats(updatedSeats); // Update local state
//     dispatch(selectTransportSeat(updatedSeats)); // Update redux state with selected seats
//   };

//   // Group into 3-3 layout rows
//   const seatRows = [];
//   for (let i = 0; i < seats.length; i += 6) {
//     seatRows.push(seats.slice(i, i + 6));
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       {/* Seat Layout */}
//       {seatRows.map((row, rowIndex) => {
//         const leftSeats = row.slice(0, 3);
//         const rightSeats = row.slice(3, 6);
//         const rowNumber = rowIndex + 1;

//         return (
//           <Box
//             key={rowIndex}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 2,
//             }}
//           >
//             {/* Left 3 seats */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {leftSeats.map((seat) => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeats={selectedSeats}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>

//             {/* Row Number */}
//             <Typography
//               variant="h6"
//               sx={{ marginX: 3, width: 30, textAlign: 'center' }}
//             >
//               {rowNumber}
//             </Typography>

//             {/* Right 3 seats */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {rightSeats.map((seat) => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeats={selectedSeats}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>
//           </Box>
//         );
//       })}

//       {/* Selected Seat Info */}
//       {selectedSeats.length > 0 && (
//         <Box
//           sx={{
//             marginTop: 4,
//             padding: 2,
//             border: '1px solid #ccc',
//             borderRadius: 2,
//             maxWidth: 400,
//             marginX: 'auto',
//             textAlign: 'center',
//             backgroundColor: '#f9f9f9',
//           }}
//         >
//           <Typography variant="h6">Selected Seat Details</Typography>
//           <Typography>Seats Selected: {selectedSeats.length}</Typography>
//           {/* Add icon to clear selection */}
//           <IconButton
//             sx={{ marginTop: 2, backgroundColor: '#f06292', color: '#fff' }}
//             onClick={() => handleSelect(selectedSeats[selectedSeats.length - 1])}
//           >
//             <AddIcon />
//           </IconButton>
//         </Box>
//       )}
//     </Box>
//   );
// };

// const SeatCard = ({ seat, selectedSeats, handleSelect }) => {
//   const isBooked = seat.status?.toUpperCase() === 'BOOKED';
//   const isSelected = selectedSeats.includes(seat.seatId);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 1,
//         width: 80,
//         textAlign: 'center',
//         backgroundColor: isSelected ? '#fce4ec' : '#fff',
//         opacity: isBooked ? 0.5 : 1,
//         cursor: isBooked ? 'not-allowed' : 'pointer',
//         border: isSelected ? '2px solid #f06292' : '1px solid #ccc',
//       }}
//       onClick={() => !isBooked && handleSelect(seat.seatId)} // Only select if not booked
//     >
//       <Typography variant="subtitle1" fontWeight="bold">
//         {seat.seatNumber}
//       </Typography>
//       <Typography variant="caption">{seat.seatType}</Typography>
//     </Paper>
//   );
// };

// export default FlightSeatSelection;


// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Paper, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

// const FlightSeatSelection = ({ seats = [] }) => {
//   const dispatch = useDispatch();
//   const selectedSeatIds = useSelector((state) => state.transportSeats.selectedSeatIds);
//   const [selectedSeats, setSelectedSeats] = useState(selectedSeatIds || []);

//   useEffect(() => {
//     if (selectedSeatIds) {
//       setSelectedSeats(selectedSeatIds);
//     }
//   }, [selectedSeatIds]);

//   if (!Array.isArray(seats) || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   // Sort seats like 1A, 1B, 1C, 2A...
//   const sortedSeats = [...seats].sort((a, b) => {
//     const [aRow, aCol] = [parseInt(a.seatNumber), a.seatNumber.slice(-1)];
//     const [bRow, bCol] = [parseInt(b.seatNumber), b.seatNumber.slice(-1)];
//     if (aRow !== bRow) return aRow - bRow;
//     return aCol.localeCompare(bCol);
//   });

//   // Group seats by row number
//   const groupedByRow = {};
//   sortedSeats.forEach(seat => {
//     const rowNum = seat.seatNumber.match(/\d+/)[0];
//     if (!groupedByRow[rowNum]) groupedByRow[rowNum] = [];
//     groupedByRow[rowNum].push(seat);
//   });

//   const handleSelect = (seatId) => {
//     const updatedSeats = selectedSeats.includes(seatId)
//       ? selectedSeats.filter(id => id !== seatId)
//       : [...selectedSeats, seatId];
//     setSelectedSeats(updatedSeats);
//     dispatch(selectTransportSeat(updatedSeats));
//   };

//   const totalPrice = selectedSeats.reduce((total, seatId) => {
//     const seat = seats.find(s => s.seatId === seatId);
//     return total + (seat ? seat.seatPrice : 0);
//   }, 0);

//   const selectedSeatNumbers = selectedSeats
//     .map(seatId => seats.find(s => s.seatId === seatId)?.seatNumber)
//     .filter(Boolean)
//     .join(', ');

//   return (
//     <Box sx={{ padding: 2 }}>
//       {Object.entries(groupedByRow).map(([row, rowSeats]) => {
//         const leftSeats = rowSeats.slice(0, 3);
//         const rightSeats = rowSeats.slice(3, 6);
//         return (
//           <Box
//             key={row}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 2,
//             }}
//           >
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {leftSeats.map(seat => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeats={selectedSeats}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>
//             <Typography
//               variant="h6"
//               sx={{ marginX: 3, width: 30, textAlign: 'center' }}
//             >
//               {row}
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {rightSeats.map(seat => (
//                 <SeatCard
//                   key={seat.seatId}
//                   seat={seat}
//                   selectedSeats={selectedSeats}
//                   handleSelect={handleSelect}
//                 />
//               ))}
//             </Box>
//           </Box>
//         );
//       })}

//       {selectedSeats.length > 0 ? (
//         <Box
//           sx={{
//             marginTop: 4,
//             padding: 2,
//             border: '1px solid #ccc',
//             borderRadius: 2,
//             maxWidth: 400,
//             marginX: 'auto',
//             textAlign: 'center',
//             backgroundColor: '#f9f9f9',
//           }}
//         >
//           <Typography variant="h6">Selected Seat Details</Typography>
//           <Typography>Seats Selected: {selectedSeats.length}</Typography>
//           <Typography>
//             Seat Numbers: <strong>{selectedSeatNumbers}</strong>
//           </Typography>
//           <Typography variant="h6" sx={{ marginTop: 2 }}>
//             Total Price: ₹{totalPrice}
//           </Typography>
//           <IconButton
//             sx={{
//               marginTop: 2,
//               backgroundColor: '#f06292',
//               color: '#fff',
//             }}
//             onClick={() =>
//               handleSelect(selectedSeats[selectedSeats.length - 1])
//             }
//           >
//             <RemoveIcon />
//           </IconButton>
//         </Box>
//       ) : (
//         <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
//           No seats selected.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// const SeatCard = ({ seat, selectedSeats, handleSelect }) => {
//   const isBooked = seat.status?.toUpperCase() === 'BOOKED';
//   const isSelected = selectedSeats.includes(seat.seatId);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 1,
//         width: 80,
//         textAlign: 'center',
//         backgroundColor: isSelected ? '#fce4ec' : '#fff',
//         opacity: isBooked ? 0.5 : 1,
//         cursor: isBooked ? 'not-allowed' : 'pointer',
//         border: isSelected ? '2px solid #f06292' : '1px solid #ccc',
//       }}
//       onClick={() => !isBooked && handleSelect(seat.seatId)}
//     >
//       <Typography variant="subtitle1" fontWeight="bold">
//         {seat.seatNumber}
//       </Typography>
//       <Typography variant="caption">{seat.seatType}</Typography>
//     </Paper>
//   );
// };

// export default FlightSeatSelection;

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';

const FlightSeatSelection = ({ seats = [] }) => {
  const dispatch = useDispatch();
  const selectedSeatIds = useSelector((state) => state.transportSeats.selectedSeatIds);
  const [selectedSeats, setSelectedSeats] = useState(selectedSeatIds || []);

  useEffect(() => {
    if (selectedSeatIds) {
      setSelectedSeats(selectedSeatIds);
    }
  }, [selectedSeatIds]);

  // Guard: if no seats
  if (!Array.isArray(seats) || seats.length === 0) {
    return <Typography>No available seats.</Typography>;
  }

  // --- Custom Sort: sort by row number then seat letter ---
  const sortSeatsByRowAndPosition = (seats, order = 'asc') => {
    return [...seats].sort((a, b) => {
      const getRowNumber = (seatNumber) => parseInt(seatNumber.match(/\d+/)[0]);
      const getSeatLetter = (seatNumber) => seatNumber.match(/[A-Z]/)[0];

      const rowA = getRowNumber(a.seatNumber);
      const rowB = getRowNumber(b.seatNumber);

      if (rowA === rowB) {
        return getSeatLetter(a.seatNumber).localeCompare(getSeatLetter(b.seatNumber));
      }
      return order === 'asc' ? rowA - rowB : rowB - rowA;
    });
  };

  const sortedSeats = sortSeatsByRowAndPosition(seats, 'asc'); // Change to 'desc' if needed

  // Group into rows: 3 left + 3 right
  const seatRows = [];
  for (let i = 0; i < sortedSeats.length; i += 6) {
    seatRows.push(sortedSeats.slice(i, i + 6));
  }

  // Toggle seat selection
  const handleSelect = (seatId) => {
    const updatedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updatedSeats);
    dispatch(selectTransportSeat(updatedSeats));
  };

  // Total price
  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const seat = seats.find((s) => s.seatId === seatId);
    return total + (seat ? seat.seatPrice : 0);
  }, 0);

  // Selected Seat Numbers
  const selectedSeatNumbers = selectedSeats
    .map((seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return seat ? seat.seatNumber : null;
    })
    .filter(Boolean)
    .join(', ');

  return (
    <Box sx={{ padding: 2 }}>
      {/* Seat Layout */}
      {seatRows.map((row, rowIndex) => {
        const leftSeats = row.slice(0, 3);
        const rightSeats = row.slice(3, 6);
        const rowNumber = rowIndex + 1;

        return (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            {/* Left 3 seats */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {leftSeats.map((seat) => (
                <SeatCard
                  key={seat.seatId}
                  seat={seat}
                  selectedSeats={selectedSeats}
                  handleSelect={handleSelect}
                />
              ))}
            </Box>

            {/* Space for aisle */}
            <Box sx={{ width: 40 }}></Box>

            {/* Right 3 seats */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {rightSeats.map((seat) => (
                <SeatCard
                  key={seat.seatId}
                  seat={seat}
                  selectedSeats={selectedSeats}
                  handleSelect={handleSelect}
                />
              ))}
            </Box>
          </Box>
        );
      })}

      {/* Selected Seat Info */}
      {selectedSeats.length > 0 && (
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            maxWidth: 400,
            marginX: 'auto',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h6">Selected Seat Details</Typography>
          <Typography>Seats Selected: {selectedSeats.length}</Typography>
          <Typography>
            Seat Numbers: <strong>{selectedSeatNumbers}</strong>
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total Price: ₹{totalPrice}
          </Typography>

          <IconButton
            sx={{
              marginTop: 2,
              backgroundColor: '#f06292',
              color: '#fff',
            }}
            onClick={() => handleSelect(selectedSeats[selectedSeats.length - 1])}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
      )}

      {/* No Seat Selected */}
      {selectedSeats.length === 0 && (
        <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
          No seats selected.
        </Typography>
      )}
    </Box>
  );
};

// --- SeatCard Component ---
const SeatCard = ({ seat, selectedSeats, handleSelect }) => {
  const isBooked = seat.status?.toUpperCase() === 'BOOKED';
  const isSelected = selectedSeats.includes(seat.seatId);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        width: 80,
        textAlign: 'center',
        backgroundColor: isSelected ? '#fce4ec' : '#fff',
        opacity: isBooked ? 0.5 : 1,
        cursor: isBooked ? 'not-allowed' : 'pointer',
        border: isSelected ? '2px solid #f06292' : '1px solid #ccc',
      }}
      onClick={() => !isBooked && handleSelect(seat.seatId)}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {seat.seatNumber}
      </Typography>
      <Typography variant="caption">{seat.seatType}</Typography>
    </Paper>
  );
};

export default FlightSeatSelection;
