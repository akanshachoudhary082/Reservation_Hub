import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import TransportSeatSelection from '../components/TransportSeat/TransportSeatSelection';

const TransportSeatSelectionPage = () => {
  const { transport } = useParams();  
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get('adminConfigId');

  console.log("Transport:", transport);
  console.log("Admin ID (serviceDetailId):", adminId);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Select Your Seat
        </Typography>
        <TransportSeatSelection transport={transport} adminId={adminId} /> 
      </Box>
    </Container>
  );
};

export default TransportSeatSelectionPage;
