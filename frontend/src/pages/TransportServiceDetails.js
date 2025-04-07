import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setServiceDetails, setError } from '../redux/actions/transportServiceDetailsAction';
import { Typography, Button, TextField, Grid, Paper, IconButton, Box } from '@mui/material';
import { SwapVert, Search,LocationOn, Flag } from '@mui/icons-material';
import { useParams, useLocation } from 'react-router-dom';

const TransportServiceDetails = () => {
  const dispatch = useDispatch();
  const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails);

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableServices, setAvailableServices] = useState([]);
  const [errorSource, setErrorSource] = useState(false);

  const location = useLocation();
  const { transport } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/details');
        dispatch(setServiceDetails(response.data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    fetchServices();
  }, [dispatch]);

  const handleSearch = () => {
    if (!source) {
      setErrorSource(true);
      return;
    }

    const filteredServices = serviceDetails.filter((service) => {
      const availableOnDate = new Date(service.availableOn);
      if (isNaN(availableOnDate)) return false;

      return (
        service.source === source &&
        service.destination === destination &&
        availableOnDate.toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      );
    });

    setAvailableServices(filteredServices);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setErrorSource(false);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Service Details
      </Typography>

      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
          boxShadow: 2,
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        {/* From -> Swap Icon (horizontal) -> To */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
  <TextField
    label="From"
    fullWidth
    value={source}
    onChange={handleSourceChange}
    error={errorSource}
    helperText={errorSource ? 'Source is required' : ''}
    InputProps={{
      startAdornment: (
        <LocationOn sx={{ color: '#1976d2', marginRight: 1 }} />
      ),
    }}
    
  />

  {/* Vertical reverse icon (default SwapVert icon) */}
  <IconButton
    onClick={handleSwap}
    sx={{
      backgroundColor: '#e0e0e0',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#cfcfcf',
      },
    }}
  >
    <SwapVert sx={{ fontSize: 28 }} />
  </IconButton>

  <TextField
    label="To"
    fullWidth
    value={destination}
    onChange={handleDestinationChange}
    InputProps={{
      startAdornment: (
        <Flag sx={{ color: '#1976d2', marginRight: 1 }} />
      ),
    }}

  />
</Box>


        {/* Date and Buttons */}
        <Box mt={3}>
          <Typography variant="body1" gutterBottom>
            Date of Journey
          </Typography>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleToday}
                sx={{
                  borderRadius: 2,
                  fontWeight: 'bold',
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#115293',
                  },
                }}
              >
                Today
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleTomorrow}
                sx={{
                  borderRadius: 2,
                  fontWeight: 'bold',
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#115293',
                  },
                }}
              >
                Tomorrow
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Search Button */}
        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearch}
            disabled={!source || !destination}
            startIcon={<Search />}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {/* Results */}
      {availableServices.length > 0 ? (
        <div style={{ marginTop: '30px' }}>
          <Typography variant="h6">Available Services</Typography>
          <Grid container spacing={2}>
            {availableServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service.detailId}>
                <Paper
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9',
                    boxShadow: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {service.detailType}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: '10px',
                      borderRadius: 2,
                      backgroundColor: '#43a047',
                      '&:hover': {
                        backgroundColor: '#388e3c',
                      },
                    }}
                    onClick={() => alert(`Booking ${service.detailType}`)}
                  >
                    Book Now
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Typography sx={{ marginTop: '20px' }}>
          No services found for the selected route
        </Typography>
      )}
    </div>
  );
};

export default TransportServiceDetails;
