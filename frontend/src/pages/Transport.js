// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setServiceDetails, setLoading, setError } from '../redux/actions/transportServiceDetailsAction';
// import { Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import busImage from '../assets/images/bus-image.jpg';
// import trainImage from '../assets/images/train-image.jpg';
// import flightImage from '../assets/images/flight-image.png';

// const Transport = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails); // Get the state from Redux

//   useEffect(() => {
//     const fetchServiceDetails = async () => {
//       dispatch(setLoading()); // Set loading to true before fetching data

//       try {
//         const response = await axios.get('http://localhost:8080/details'); // Make API call to fetch data
//         dispatch(setServiceDetails(response.data)); // Dispatch data to store
//       } catch (err) {
//         dispatch(setError(err.message)); // If error occurs, dispatch error to store
//       }
//     };

//     fetchServiceDetails();
//   }, [dispatch]); // Run this effect only once when component mounts

//   // Loading and error handling
//   if (loading) return <Typography variant="h6" textAlign="center">Loading transport services...</Typography>;
//   if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

//   // Filter to only include the service types you want to display (BUS, TRAIN, FLIGHT)
//   const uniqueServiceTypes = Array.from(new Set(serviceDetails.map(service => service.detailType))); // Get unique service types

//   // Function to get the correct image for each service type
//   const getImageForServiceType = (type) => {
//     switch (type) {
//       case 'BUS':
//         return busImage;
//       case 'TRAIN':
//         return trainImage;
//       case 'FLIGHT':
//         return flightImage;
//       default:
//         return busImage; // Default fallback image
//     }
//   };

//   return (
//     <div>
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: 'center',
//           marginBottom: '30px',
//           fontSize: { xs: '1.5rem', sm: '2rem' },
//           color: 'white', // Make the text white for better visibility
//           fontFamily: 'Bebas Neue',
//           fontWeight: 800,
//         }}
//       >
//         BOOK YOUR TICKETS NOW!
//       </Typography>

//       <Grid container spacing={2} justifyContent="center">
//         {uniqueServiceTypes && uniqueServiceTypes.length > 0 ? (
//           uniqueServiceTypes.map((type) => (
//             <Grid item xs={12} sm={4} md={3} key={type}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="auto"
//                   image={getImageForServiceType(type)} // Get the image for the service type
//                   alt={type}
//                   sx={{
//                     objectFit: 'cover',
//                     width: '100%',
//                     height: { xs: '150px', sm: '200px' },
//                   }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
//                     {type} {/* Show the service type (BUS, TRAIN, FLIGHT) */}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     sx={{ marginTop: '10px' }}
//                     onClick={() => navigate(`/details/${type}`)} // Navigate to the detail page for that service type
//                   >
//                     Book Now
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography>No transport services available</Typography>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default Transport;

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
  const { serviceDetails, loading, error } = useSelector((state) => state.transportServiceDetails); // Get the state from Redux

  useEffect(() => {
    const fetchServiceDetails = async () => {
      dispatch(setLoading()); // Set loading to true before fetching data

      try {
        const response = await axios.get('http://localhost:3000/details'); 
        console.log("API Response:", response.data); 
        dispatch(setServiceDetails(response.data)); 
      } catch (err) {
        dispatch(setError(err.message)); // If error occurs, dispatch error to store
      }
    };

    fetchServiceDetails();
  }, [dispatch]); // Run this effect only once when component mounts

  // Loading and error handling
  if (loading) return <Typography variant="h6" textAlign="center">Loading transport services...</Typography>;
  if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

  // Function to get unique service types (BUS, TRAIN, FLIGHT)
  const getUniqueServiceTypes = (services) => {
    const uniqueTypes = ['BUS', 'TRAIN', 'FLIGHT']; // We only want these three service types
    return services.filter(service => uniqueTypes.includes(service.detailType))
                   .reduce((acc, service) => {
                     // Ensure only one card per type is displayed
                     if (!acc.some(item => item.detailType === service.detailType)) {
                       acc.push(service);
                     }
                     return acc;
                   }, []);
  };

  // Filter unique service types (BUS, TRAIN, FLIGHT)
  const uniqueServices = getUniqueServiceTypes(serviceDetails);

  // Function to get the correct image for each service type
  const getImageForServiceType = (type) => {
    switch (type) {
      case 'BUS':
        return busImage;
      case 'TRAIN':
        return trainImage;
      case 'FLIGHT':
        return flightImage;
      default:
        return busImage; // Default fallback image
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: { xs: '1.5rem', sm: '2rem' },
          color: 'white', // Make the text white for better visibility
          fontFamily: 'Bebas Neue',
          fontWeight: 800,
        }}
      >
        BOOK YOUR TICKETS NOW!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {uniqueServices.length > 0 ? (
          uniqueServices.map((service) => (
            <Grid item xs={12} sm={4} md={3} key={service.detailType}>
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  image={getImageForServiceType(service.detailType)} // Get the image for the service type
                  alt={service.detailType}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: { xs: '150px', sm: '200px' },
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {service.detailType} {/* Show the service type (BUS, TRAIN, FLIGHT) */}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: '10px' }}
                    onClick={() => navigate(`/details/${service.detailType}`)} // Navigate to the detail page for that service type
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
