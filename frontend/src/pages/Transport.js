import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setServiceDetails, setLoading, setError } from '../redux/actions/transportServiceDetailsAction';
import { Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import busImage from '../assets/images/bus-image.jpg';
import trainImage from '../assets/images/train-image.jpg';
import flightImage from '../assets/images/flight-image.png';

const Transport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails);

  useEffect(() => {
   
    const fetchServiceDetails = async () => {
      dispatch(setLoading()); 
      try {
        const response = await axios.get('http://localhost:8080/details'); 
        console.log("API Response:", response.data); 
        dispatch(setServiceDetails(response.data)); 
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchServiceDetails();
  }, [dispatch]);

  
  if (loading) return <Typography variant="h6" textAlign="center">Loading transport services...</Typography>;

  
  if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

  const transportServices = serviceDetails.filter((service) => 
    service.detailType === 'BUS' || service.detailType === 'TRAIN' || service.detailType === 'FLIGHT'
  );


  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: { xs: '1.5rem', sm: '2rem' },
          color: 'white', // Responsive typography
          fontFamily: 'Bebas Neue',
          fontWeight: 800, 
        }}
      >
        BOOK YOUR TICKETS NOW!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {transportServices && transportServices.length > 0 ? (
          transportServices.map((service) => (
            <Grid item xs={12} sm={4} md={3} key={service.detailId}>
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  image={
                    service.detailType === 'BUS' ? busImage :
                    service.detailType === 'TRAIN' ? trainImage :
                    service.detailType === 'FLIGHT' ? flightImage :
                    busImage 
                  }
                  alt={service.detailType}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: { xs: '150px', sm: '200px' },
                  }}
                />
                <CardContent>
                  
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {service.detailType}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: '10px' }}
                    onClick={() => navigate(`/details/${service.detailId}`)} 
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No transport services available</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Transport;
