import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setServiceDetails, setLoading, setError } from '../redux/actions/transportServiceDetailsAction';
import { Grid, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import busImage from '../assets/images/bus-image.jpg';
import trainImage from '../assets/images/train-image.jpg';
import flightImage from '../assets/images/flight-image.png';
import '../assets/styles/transport.scss'; 


const Transport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      dispatch(setLoading());

      const token = Cookies.get('jwtToken');
      console.log('Using token:', token);

      try {
        const response = await axios.get('/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setServiceDetails(response.data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchServiceDetails();
  }, [dispatch]);

  if (loading) return <Typography variant="h6" textAlign="center">Loading transport services...</Typography>;
  if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

  const getUniqueServiceTypes = (services) => {
    const allowedTypes = ['BUS', 'TRAIN', 'FLIGHT'];
    return services.filter(service => allowedTypes.includes(service.detailType))
      .reduce((unique, current) => {
        if (!unique.some(item => item.detailType === current.detailType)) {
          unique.push(current);
        }
        return unique;
      }, []);
  };

  const uniqueServices = getUniqueServiceTypes(serviceDetails);

  const getImageForServiceType = (type) => {
    switch (type) {
      case 'BUS': 
        return { 
          src: busImage, 
          width: '100%', 
          height: '60%' 
        };
      case 'TRAIN': 
        return { 
          src: trainImage, 
          width: '85%', 
          height: '75%',
          Margin: '12px' 
        };
      case 'FLIGHT': 
        return { 
          src: flightImage, 
          width: '100%', 
          height: '50%' 
        };
      default: 
        return { 
          src: busImage, 
          width: '100%', 
          height: '60%' 
        };
    }
  };

  return (
    <Box className="transport-container">
      <Typography variant="h4" className="transport-heading" sx={{ fontFamily: 'Bebas Neue', fontSize: '3rem', fontWeight: 800, textAlign: 'center', color: 'black', marginBottom: '30px' }}>
        BOOK YOUR TICKETS NOW!
      </Typography>

      <Grid container spacing={3} className="transport-grid">
        {uniqueServices.length > 0 ? (
          uniqueServices.map((service) => {
            const { src, width, height } = getImageForServiceType(service.detailType);

            return (
              <Grid item xs={12} sm={6} md={4} key={service.detailType}>
                <Card className="transport-card">
                  <CardMedia
                    component="img"
                    image={src}
                    alt={service.detailType}
                    style={{ width: width, height: height }} // Apply width and height dynamically
                    className="transport-image"
                  />
                  <CardContent className="transport-content">
                    <Typography className="transport-title" variant="h6">
                      {service.detailType}
                    </Typography>
                    <Button
                      variant="contained"
                      className="transport-button"
                      onClick={() => navigate(`/details/${service.detailType}`)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography>No transport services available</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Transport;

