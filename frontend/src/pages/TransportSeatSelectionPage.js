import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';  // Import useSearchParams
import { Container, Typography, Box } from '@mui/material'; 
import TransportSeatSelection from '../components/TransportSeat/TransportSeatSelection';

const TransportSeatSelectionPage = () => {
  const { transport } = useParams();  // Get the route parameter 'transport'

  
  const [searchParams] = useSearchParams();
  const serviceDetailId = searchParams.get('serviceDetailId');

  console.log("Transport:", transport); 
  console.log("Service Detail ID:", serviceDetailId);  

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
