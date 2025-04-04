// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setServiceDetails, setLoading, setError } from '../redux/actions/transportServiceDetailsAction';
// import { Typography, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';

// const ServiceDetails = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails);

//   useEffect(() => {
//     const fetchServiceDetail = async () => {
//       dispatch(setLoading());
//       try {
//         const response = await axios.get(`http://localhost:8080/details/${id}`);
//         dispatch(setServiceDetails([response.data])); // We use an array because the reducer expects an array
//       } catch (err) {
//         dispatch(setError(err.message));
//       }
//     };

//     fetchServiceDetail();
//   }, [dispatch, id]);

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">Error: {error}</Typography>;

//   return (
//     <div>
//       {serviceDetails && serviceDetails.length > 0 ? (
//         serviceDetails.map((service) => (
//           <div key={service.detailId}>
//             <Typography variant="h5">{service.detailType}</Typography>
//             <Typography variant="body1">Source: {service.source}</Typography>
//             <Typography variant="body1">Destination: {service.destination}</Typography>
//             <Typography variant="body1">Departure: {service.departureTime}</Typography>
//             <Typography variant="body1">Arrival: {service.arrivalTime}</Typography>
//             {/* <Typography variant="body1">Venue: {service.venue}</Typography> */}
//             <Button variant="contained" onClick={() => alert(`Booking ${service.detailType}`)}>
//               Book Now
//             </Button>
//           </div>
//         ))
//       ) : (
//         <Typography>No service details found</Typography>
//       )}
//     </div>
//   );
// };

// export default ServiceDetails;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setServiceDetails, setLoading, setError } from '../redux/actions/transportServiceDetailsAction';
import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';  

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails);

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [availableServices, setAvailableServices] = useState([]);

  
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

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSource = queryParams.get('source') || '';
  const initialDestination = queryParams.get('destination') || '';

  
  useEffect(() => {
    setSource(initialSource);
    setDestination(initialDestination);
  }, [initialSource, initialDestination]);

 
  const handleSearch = () => {
    const filteredServices = serviceDetails.filter(
      (service) => service.source === source && service.destination === destination
    );
    setAvailableServices(filteredServices);
  };

  
  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  
  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px'}}>
      <Typography variant="h5" gutterBottom>
        Search for Transport Services
      </Typography>

 
      <Grid container spacing={2} justifyContent="center" marginBottom={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              value={source}
              onChange={handleSourceChange}
              label="Source"
              required
            >
              {serviceDetails
                .map((service) => service.source)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((source) => (
                  <MenuItem key={source} value={source}>
                    {source}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Destination</InputLabel>
            <Select
              value={destination}
              onChange={handleDestinationChange}
              label="Destination"
              required
            >
              {serviceDetails
                .map((service) => service.destination)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((destination) => (
                  <MenuItem key={destination} value={destination}>
                    {destination}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        
        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={{ height: '100%' }}
            onClick={handleSearch}
            disabled={!source || !destination}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      
      {availableServices.length > 0 ? (
        <div>
          <Typography variant="h6">Available Services</Typography>
          <Grid container spacing={2}>
            {availableServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.detailId}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white' }}>
                  <Typography variant="h6">{service.detailType}</Typography> 
                  <Typography variant="body1">Departure: {service.departureTime}</Typography>
                  <Typography variant="body1">Arrival: {service.arrivalTime}</Typography>
                  <Typography variant="body1">Source: {service.source}</Typography>
                  <Typography variant="body1">Destination: {service.destination}</Typography>
                  <Button variant="contained" onClick={() => alert(`Booking ${service.detailType}`)}>
                    Book Now
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Typography>No services found for the selected route</Typography>
      )}
    </div>
  );
};

export default ServiceDetails;
