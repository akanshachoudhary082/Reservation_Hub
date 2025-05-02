
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

//   // Guard: if no seats
//   if (!Array.isArray(seats) || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   // --- Custom Sort: sort by row number then seat letter ---
//   const sortSeatsByRowAndPosition = (seats, order = 'asc') => {
//     return [...seats].sort((a, b) => {
//       const getRowNumber = (seatNumber) => parseInt(seatNumber.match(/\d+/)[0]);
//       const getSeatLetter = (seatNumber) => seatNumber.match(/[A-Z]/)[0];

//       const rowA = getRowNumber(a.seatNumber);
//       const rowB = getRowNumber(b.seatNumber);

//       if (rowA === rowB) {
//         return getSeatLetter(a.seatNumber).localeCompare(getSeatLetter(b.seatNumber));
//       }
//       return order === 'asc' ? rowA - rowB : rowB - rowA;
//     });
//   };

//   const sortedSeats = sortSeatsByRowAndPosition(seats, 'asc'); // Change to 'desc' if needed

//   // Group into rows: 3 left + 3 right
//   const seatRows = [];
//   for (let i = 0; i < sortedSeats.length; i += 6) {
//     seatRows.push(sortedSeats.slice(i, i + 6));
//   }

//   // Toggle seat selection
//   const handleSelect = (seatId) => {
//     const updatedSeats = selectedSeats.includes(seatId)
//       ? selectedSeats.filter(id => id !== seatId)
//       : [...selectedSeats, seatId];

//     setSelectedSeats(updatedSeats);
//     dispatch(selectTransportSeat(updatedSeats));
//   };

//   // Total price
//   const totalPrice = selectedSeats.reduce((total, seatId) => {
//     const seat = seats.find((s) => s.seatId === seatId);
//     return total + (seat ? seat.seatPrice : 0);
//   }, 0);

//   // Selected Seat Numbers
//   const selectedSeatNumbers = selectedSeats
//     .map((seatId) => {
//       const seat = seats.find((s) => s.seatId === seatId);
//       return seat ? seat.seatNumber : null;
//     })
//     .filter(Boolean)
//     .join(', ');

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

//             {/* Space for aisle */}
//             <Box sx={{ width: 40 }}></Box>

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
//             onClick={() => handleSelect(selectedSeats[selectedSeats.length - 1])}
//           >
//             <RemoveIcon />
//           </IconButton>
//         </Box>
//       )}

//       {/* No Seat Selected */}
//       {selectedSeats.length === 0 && (
//         <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
//           No seats selected.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// // --- SeatCard Component ---
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



// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Paper, IconButton, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';
// import { useNavigate } from 'react-router-dom';

// const FlightSeatSelection = ({ seats = [] }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const selectedSeatIds = useSelector((state) => state.transportSeats.selectedSeatIds);
//   const [selectedSeats, setSelectedSeats] = useState(selectedSeatIds || []);
//   const [isAddMode, setIsAddMode] = useState(true);

//   useEffect(() => {
//     if (selectedSeatIds) {
//       setSelectedSeats(selectedSeatIds);
//     }
//   }, [selectedSeatIds]);

//   if (!Array.isArray(seats) || seats.length === 0) {
//     return <Typography>No available seats.</Typography>;
//   }

//   const sortSeatsByRowAndPosition = (seats, order = 'asc') => {
//     return [...seats].sort((a, b) => {
//       const getRowNumber = (seatNumber) => parseInt(seatNumber.match(/\d+/)[0]);
//       const getSeatLetter = (seatNumber) => seatNumber.match(/[A-Z]/)[0];

//       const rowA = getRowNumber(a.seatNumber);
//       const rowB = getRowNumber(b.seatNumber);

//       if (rowA === rowB) {
//         return getSeatLetter(a.seatNumber).localeCompare(getSeatLetter(b.seatNumber));
//       }
//       return order === 'asc' ? rowA - rowB : rowB - rowA;
//     });
//   };

//   const sortedSeats = sortSeatsByRowAndPosition(seats, 'asc');

//   const seatRows = [];
//   for (let i = 0; i < sortedSeats.length; i += 6) {
//     seatRows.push(sortedSeats.slice(i, i + 6));
//   }

//   const handleSelect = (seatId) => {
//     const updatedSeats = selectedSeats.includes(seatId)
//       ? selectedSeats.filter(id => id !== seatId)
//       : [...selectedSeats, seatId];

//     setSelectedSeats(updatedSeats);
//     dispatch(selectTransportSeat(updatedSeats));
//   };

//   const totalPrice = selectedSeats.reduce((total, seatId) => {
//     const seat = seats.find((s) => s.seatId === seatId);
//     return total + (seat ? seat.seatPrice : 0);
//   }, 0);

//   const selectedSeatNumbers = selectedSeats
//     .map((seatId) => {
//       const seat = seats.find((s) => s.seatId === seatId);
//       return seat ? seat.seatNumber : null;
//     })
//     .filter(Boolean)
//     .join(', ');

//   const selectedSeatObjects = selectedSeats
//     .map((seatId) => seats.find((s) => s.seatId === seatId))
//     .filter(Boolean);

//   const toggleAddRemove = () => {
//     if (isAddMode) {
//       // Remove all selected seats
//       setSelectedSeats([]);
//       dispatch(selectTransportSeat([]));
//     }
//     setIsAddMode(!isAddMode);
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       {/* Seat Layout */}
//       {seatRows.map((row, rowIndex) => {
//         const leftSeats = row.slice(0, 3);
//         const rightSeats = row.slice(3, 6);

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

//             {/* Aisle */}
//             <Box sx={{ width: 40 }}></Box>

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
//           <Typography>
//             Seat Numbers: <strong>{selectedSeatNumbers}</strong>
//           </Typography>
//           <Typography variant="h6" sx={{ marginTop: 2 }}>
//             Total Price: ₹{totalPrice}
//           </Typography>

//           <IconButton
//             sx={{ marginTop: 2, fontSize: 30 }}
//             color="primary"
//             onClick={toggleAddRemove}
//           >
//             {isAddMode ? <RemoveIcon /> : <AddIcon />}
//           </IconButton>

//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3 }}
//             onClick={() =>
//               navigate('/transport-booking', {
//                 state: { selectedSeats: selectedSeatObjects, totalPrice },
//               })
//             }
//           >
//             Proceed
//           </Button>
//         </Box>
//       )}

//       {selectedSeats.length === 0 && (
//         <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
//           No seats selected.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// // --- SeatCard Component ---
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
import { Box, Typography, Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';
import { useNavigate } from 'react-router-dom';

const FlightSeatSelection = ({ seats = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSeatIds = useSelector((state) => state.transportSeats.selectedSeatIds);
  const [selectedSeats, setSelectedSeats] = useState(selectedSeatIds || []);
  const [isAddMode, setIsAddMode] = useState(true);

  useEffect(() => {
    if (selectedSeatIds) {
      setSelectedSeats(selectedSeatIds);
    }
  }, [selectedSeatIds]);

  if (!Array.isArray(seats) || seats.length === 0) {
    return <Typography>No available seats.</Typography>;
  }

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

  const sortedSeats = sortSeatsByRowAndPosition(seats, 'asc');

  const seatRows = [];
  for (let i = 0; i < sortedSeats.length; i += 6) {
    seatRows.push(sortedSeats.slice(i, i + 6));
  }

  const handleSelect = (seatId) => {
    const updatedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updatedSeats);
    dispatch(selectTransportSeat(updatedSeats));
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const seat = seats.find((s) => s.seatId === seatId);
    return total + (seat ? seat.seatPrice : 0);
  }, 0);

  const selectedSeatNumbers = selectedSeats
    .map((seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return seat ? seat.seatNumber : null;
    })
    .filter(Boolean)
    .join(', ');

  const selectedSeatObjects = selectedSeats
    .map((seatId) => seats.find((s) => s.seatId === seatId))
    .filter(Boolean);

  const toggleAddRemove = () => {
    if (!isAddMode && selectedSeats.length > 0) {
      // Remove the last selected seat when in remove mode
      const seatToRemove = selectedSeats[selectedSeats.length - 1]; // Get the last selected seat
      const updatedSeats = selectedSeats.filter(id => id !== seatToRemove); // Remove that seat
      setSelectedSeats(updatedSeats); // Update the state
      dispatch(selectTransportSeat(updatedSeats)); // Dispatch the updated selection
    }
    setIsAddMode(!isAddMode); // Toggle between add and remove mode
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Seat Layout */}
      {seatRows.map((row, rowIndex) => {
        const leftSeats = row.slice(0, 3);
        const rightSeats = row.slice(3, 6);

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

            {/* Aisle */}
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
            sx={{ marginTop: 2, fontSize: 30 }}
            color="primary"
            onClick={toggleAddRemove}
          >
            {isAddMode ? <AddIcon /> : <RemoveIcon />}
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() =>
              navigate('/transport-booking', {
                state: { selectedSeats: selectedSeatObjects, totalPrice },
              })
            }
          >
            Proceed
          </Button>
        </Box>
      )}

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
