// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { selectTransportSeat } from '../../redux/actions/transportSeatActions';
// import { Box, Typography, Button, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import '../../assets/styles/BusSeatSelection.scss';

// const BusSeatSelection = ({ upperDeck = [], lowerDeck = [] }) => {
//   const dispatch = useDispatch();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [seatCount, setSeatCount] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isAddMode, setIsAddMode] = useState(false);

//   const handleSelect = (seat) => {
//     if (seat.status?.toLowerCase() === 'booked') return;

//     const isSelected = selectedSeats.includes(seat.seatId);
//     let updatedSeats = isSelected
//       ? selectedSeats.filter(id => id !== seat.seatId)
//       : [...selectedSeats, seat.seatId];

//     setSelectedSeats(updatedSeats);
//     setSeatCount(updatedSeats.length);

//     const allSeats = [...upperDeck, ...lowerDeck];
//     const selectedSeatObjects = allSeats.filter(seat => updatedSeats.includes(seat.seatId));
//     const updatedPrice = selectedSeatObjects.reduce((sum, seat) => sum + (seat.seatPrice || 0), 0);
//     setTotalPrice(updatedPrice);

//     dispatch(selectTransportSeat(seat.seatId));
//   };

//   const getSeatClass = (seat) => {
//     const isSelected = selectedSeats.includes(seat.seatId);
//     const status = seat.status?.toLowerCase();
//     let seatClass = 'seat-container';
//     if (status === 'booked') seatClass += ' booked';
//     if (isSelected) seatClass += ' selected';
//     return seatClass;
//   };

//   const renderDeck = (deckName, seatsToRender) => {
//     return (
//       <Box className="deck-container">
//         <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
//           {deckName}
//         </Typography>
//         <Box className="deck-box">
//           {seatsToRender.map((seat) => {
//             return (
//               <Box key={seat.seatId} className={getSeatClass(seat)} onClick={() => handleSelect(seat)}>
//                 <Box className={`pillow ${seat.status?.toLowerCase() === 'booked' ? 'booked' : ''}`} />
//                 <Typography className="seat-label">
//                   {selectedSeats.includes(seat.seatId)
//                     ? 'Selected'
//                     : seat.status?.toLowerCase() === 'available'
//                     ? 'Available'
//                     : 'Booked'}
//                 </Typography>

//                 {seat.status?.toLowerCase() === 'available' && typeof seat.seatPrice === 'number' && (
//                   <Typography variant="body2" className="seat-price">
//                     ₹{seat.seatPrice.toFixed(2)}
//                   </Typography>
//                 )}
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   };

//   const toggleAddRemove = () => {
//     setIsAddMode(!isAddMode);
//     if (isAddMode && selectedSeats.length > 0) {
//       const updatedSeats = selectedSeats.slice(0, -1);
//       setSelectedSeats(updatedSeats);
//       setSeatCount(updatedSeats.length);

//       const allSeats = [...upperDeck, ...lowerDeck];
//       const selectedSeatObjects = allSeats.filter(seat => updatedSeats.includes(seat.seatId));
//       const updatedPrice = selectedSeatObjects.reduce((sum, seat) => sum + (seat.seatPrice || 0), 0);
//       setTotalPrice(updatedPrice);
//     }
//   };

//   const renderSelectedSeatNumbers = () => {
//     const allSeats = [...upperDeck, ...lowerDeck];
//     return allSeats
//       .filter(seat => selectedSeats.includes(seat.seatId))
//       .map(seat => seat.seatNumber)
//       .join(', ');
//   };

//   return (
//     <Box sx={{ padding: 6, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 6 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap' }}>
//         <Box sx={{ flex: 1, minWidth: '250px' }}>{renderDeck('Lower Deck', lowerDeck)}</Box>
//         <Box sx={{ flex: 1, minWidth: '250px' }}>{renderDeck('Upper Deck', upperDeck)}</Box>
//       </Box>

//       {/* Move selected seats container below the decks */}
//       {seatCount > 0 && (
//         <Box className="selected-seats-container" sx={{ marginTop: 4 }}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//             Selected Seats: {seatCount}
//           </Typography>
         
//           <Typography variant="body1">Total Price: ₹{totalPrice.toFixed(2)}</Typography>

//           <Typography variant="body1">Seat Numbers: {renderSelectedSeatNumbers()}</Typography>
//           <IconButton color="primary" sx={{ fontSize: 30 }} onClick={toggleAddRemove}>
//             {isAddMode ? '-' : <AddIcon />}
//           </IconButton>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3 }}
//             onClick={() => alert('Proceeding to the booking page')}
//           >
//             Proceed
//           </Button>
//         </Box>
//       )}

//       <Box className="legend-container">
//         <Box className="legend-item">
//           <Box className="legend-box available" />
//           <Typography variant="body2">Available</Typography>
//         </Box>
//         <Box className="legend-item">
//           <Box className="legend-box selected" />
//           <Typography variant="body2">Selected</Typography>
//         </Box>
//         <Box className="legend-item">
//           <Box className="legend-box booked" />
//           <Typography variant="body2">Booked</Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default BusSeatSelection;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectTransportSeat } from '../../redux/actions/transportSeatActions';
import { Box, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../../assets/styles/BusSeatSelection.scss';

const BusSeatSelection = ({ upperDeck = [], lowerDeck = [] }) => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleSelect = (seat) => {
    if (seat.status?.toLowerCase() === 'booked') return;

    const isSelected = selectedSeats.includes(seat.seatId);
    let updatedSeats = isSelected
      ? selectedSeats.filter(id => id !== seat.seatId)
      : [...selectedSeats, seat.seatId];

    setSelectedSeats(updatedSeats);
    setSeatCount(updatedSeats.length);

    const allSeats = [...upperDeck, ...lowerDeck];
    const selectedSeatObjects = allSeats.filter(seat => updatedSeats.includes(seat.seatId));
    const updatedPrice = selectedSeatObjects.reduce((sum, seat) => sum + (seat.seatPrice || 0), 0);
    setTotalPrice(updatedPrice);

    dispatch(selectTransportSeat(seat.seatId));
  };

  const getSeatClass = (seat) => {
    const isSelected = selectedSeats.includes(seat.seatId);
    const status = seat.status?.toLowerCase();
    let seatClass = 'seat-container';
    if (status === 'booked') seatClass += ' booked';
    if (isSelected) seatClass += ' selected';
    return seatClass;
  };

  const renderDeck = (deckName, seatsToRender) => {
    return (
      <Box className="deck-container">
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {deckName}
        </Typography>
        <Box className="deck-box">
          {seatsToRender.map((seat) => {
            return (
              <Box key={seat.seatId} className={getSeatClass(seat)} onClick={() => handleSelect(seat)}>
                <Box className={`pillow ${seat.status?.toLowerCase() === 'booked' ? 'booked' : ''}`} />
                <Typography className="seat-label">
                  {selectedSeats.includes(seat.seatId)
                    ? 'Selected'
                    : seat.status?.toLowerCase() === 'available'
                    ? 'Available'
                    : 'Booked'}
                </Typography>

                {seat.status?.toLowerCase() === 'available' && typeof seat.seatPrice === 'number' && (
                  <Typography variant="body2" className="seat-price">
                    ₹{seat.seatPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  const toggleAddRemove = () => {
    setIsAddMode(!isAddMode);
    if (isAddMode && selectedSeats.length > 0) {
      const updatedSeats = selectedSeats.slice(0, -1);
      setSelectedSeats(updatedSeats);
      setSeatCount(updatedSeats.length);

      const allSeats = [...upperDeck, ...lowerDeck];
      const selectedSeatObjects = allSeats.filter(seat => updatedSeats.includes(seat.seatId));
      const updatedPrice = selectedSeatObjects.reduce((sum, seat) => sum + (seat.seatPrice || 0), 0);
      setTotalPrice(updatedPrice);
    }
  };

  const renderSelectedSeatNumbers = () => {
    const allSeats = [...upperDeck, ...lowerDeck];
    return allSeats
      .filter(seat => selectedSeats.includes(seat.seatId))
      .map(seat => seat.seatNumber)
      .join(', ');
  };

  return (
    <Box className="main-container" sx={{ padding: 6, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: '250px' }}>{renderDeck('Lower Deck', lowerDeck)}</Box>
        <Box sx={{ flex: 1, minWidth: '250px' }}>{renderDeck('Upper Deck', upperDeck)}</Box>
      </Box>

      {/* Move selected seats container below the decks */}
      {seatCount > 0 && (
        <Box className="selected-seats-container" sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Selected Seats: {seatCount}
          </Typography>
         
          <Typography variant="body1">Total Price: ₹{totalPrice.toFixed(2)}</Typography>

          <Typography variant="body1">Seat Numbers: {renderSelectedSeatNumbers()}</Typography>
          <IconButton color="primary" sx={{ fontSize: 30 }} onClick={toggleAddRemove}>
            {isAddMode ? '-' : <AddIcon />}
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => alert('Proceeding to the booking page')}
          >
            Proceed
          </Button>
        </Box>
      )}

      <Box className="legend-container">
        <Box className="legend-item">
          <Box className="legend-box available" />
          <Typography variant="body2">Available</Typography>
        </Box>
        <Box className="legend-item">
          <Box className="legend-box selected" />
          <Typography variant="body2">Selected</Typography>
        </Box>
        <Box className="legend-item">
          <Box className="legend-box booked" />
          <Typography variant="body2">Booked</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BusSeatSelection;
