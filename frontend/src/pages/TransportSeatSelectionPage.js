// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Typography, Box } from '@mui/material'; 
// import TransportSeatSelection from '../components/TransportSeat/TransportSeatSelection';
// const TransportSeatSelectionPage = () => {
//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4, mb: 2 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Select Your Seat
//         </Typography>
//         <TransportSeatSelection />
//       </Box>
//     </Container>
//   );
// };

// export default TransportSeatSelectionPage;


import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';  // Import useSearchParams
import { Container, Typography, Box } from '@mui/material'; 
import TransportSeatSelection from '../components/TransportSeat/TransportSeatSelection';

const TransportSeatSelectionPage = () => {
  const { transport } = useParams();  // Get the route parameter 'transport'

  // Get the query parameter 'serviceDetailId'
  const [searchParams] = useSearchParams();
  const serviceDetailId = searchParams.get('serviceDetailId');

  console.log("Transport:", transport);  // e.g., 'Bus'
  console.log("Service Detail ID:", serviceDetailId);  // e.g., 123

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Select Your Seat
        </Typography>
        <TransportSeatSelection />
      </Box>
    </Container>
  );
};

export default TransportSeatSelectionPage;
