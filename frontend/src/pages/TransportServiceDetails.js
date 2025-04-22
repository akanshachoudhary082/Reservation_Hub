import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { Typography, Button, TextField, Grid, Paper, IconButton, Box, InputAdornment } from '@mui/material';
import { SwapVert, Search, LocationOn, Flag } from '@mui/icons-material';

const TransportServiceDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { transport } = useParams();

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableServices, setAvailableServices] = useState([]);
  const [errorSource, setErrorSource] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!source || !destination || !selectedDate) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const requestDTO = {
      sourceCity: source.trim(),
      destinationCity: destination.trim(),
      availableOn: selectedDate,
      moduleCode: transport.toUpperCase() 
    };

    try {
      setLoading(true);
      setErrorMessage('');
      setHasSearched(true);

    
      const token = Cookies.get('jwtToken'); 
      if (!token) {
        setErrorMessage('Authentication token is missing.');
        return;
      }


      const response = await axios.post('/transport/search', requestDTO, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (Array.isArray(response.data)) {
        setAvailableServices(response.data);
      } else {
        setAvailableServices([]);
      }
    } catch (err) {
      setAvailableServices([]);
      setErrorMessage('Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
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

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Service Details</Typography>

      <Paper sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f9f9f9', boxShadow: 2, maxWidth: 600, margin: '0 auto' }}>
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
                <InputAdornment position="start">
                  <LocationOn sx={{ color: '#1976d2', marginRight: 1 }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={handleSwap} sx={{ backgroundColor: '#e0e0e0', borderRadius: '50%', '&:hover': { backgroundColor: '#cfcfcf' } }}>
            <SwapVert sx={{ fontSize: 28 }} />
          </IconButton>

          <TextField
            label="To"
            fullWidth
            value={destination}
            onChange={handleDestinationChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Flag sx={{ color: '#1976d2', marginRight: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="body1" gutterBottom>Date of Journey</Typography>
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
              <Button fullWidth variant="outlined" onClick={handleToday}
                sx={{ borderRadius: 2, fontWeight: 'bold', color: '#1976d2', borderColor: '#1976d2', '&:hover': { backgroundColor: '#e3f2fd', borderColor: '#115293' } }}>
                Today
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button fullWidth variant="outlined" onClick={handleTomorrow}
                sx={{ borderRadius: 2, fontWeight: 'bold', color: '#1976d2', borderColor: '#1976d2', '&:hover': { backgroundColor: '#e3f2fd', borderColor: '#115293' } }}>
                Tomorrow
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearch}
            disabled={!source || !destination || !selectedDate}
            startIcon={<Search />}
            sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold', borderRadius: 2, '&:hover': { backgroundColor: '#1565c0' } }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      <Box mt={4}>
        {loading && <Typography>Loading services...</Typography>}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}

        {!loading && hasSearched && availableServices.length === 0 && !errorMessage && (
          <Typography>No services available for this route.</Typography>
        )}

        <Grid container spacing={2}>
          {availableServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
              <Paper sx={{ padding: 2, borderRadius: 2, backgroundColor: '#f9f9f9', boxShadow: 2 }}>
                <Typography variant="h6" gutterBottom>{service.name}</Typography>
                <Typography variant="body2">Start Time: {new Date(service.startPoint).toLocaleTimeString()}</Typography>
                <Typography variant="body2">End Time: {new Date(service.endPoint).toLocaleTimeString()}</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>₹{service.price}</Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: '10px', borderRadius: 2, backgroundColor: '#43a047', '&:hover': { backgroundColor: '#388e3c' } }}
                  onClick={() => navigate(`/seats/${transport}?serviceDetailId=${service.id}`)}  // Pass the correct serviceDetailId here
                >
                  Book Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TransportServiceDetails;
