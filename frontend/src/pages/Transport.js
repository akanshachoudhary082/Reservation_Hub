// // src/pages/Transport.js

// import React from 'react';
// import { Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';

// // Import your images
// import busImage from '../assets/images/bus-image.jpg';
// import trainImage from '../assets/images/train-image.jpg';
// import flightImage from '../assets/images/flight-image.png';

// const Transport = () => {
//   return (
//     <div>
//       <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px' }}>
//         Choose Your Transport
//       </Typography>
//       <Grid container spacing={3} justifyContent="center">
//         {/* Bus Card */}
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardMedia
//               component="img"
//               height="200"
//               image={busImage} 
//               alt="Bus"
//             />
//             <CardContent>
//               <Typography variant="h6">Bus</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Affordable and convenient travel by bus.
//               </Typography>
//               <Button variant="contained" sx={{ marginTop: '10px' }}>Book Now</Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Train Card */}
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardMedia
//               component="img"
//               height="200"
//               image={trainImage}  
//               alt="Train"
//             />
//             <CardContent>
//               <Typography variant="h6">Train</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Comfortable and scenic train journeys.
//               </Typography>
//               <Button variant="contained" sx={{ marginTop: '10px' }}>Book Now</Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Flight Card */}
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardMedia
//               component="img"
//               height="200"
//               image={flightImage}  
//               alt="Flight"
//             />
//             <CardContent>
//               <Typography variant="h6">Flight</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Fast and convenient air travel options.
//               </Typography>
//               <Button variant="contained" sx={{ marginTop: '10px' }}>Book Now</Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Transport;

// src/pages/Transport.js

import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';

// Import your images
import busImage from '../assets/images/bus-image.jpg';
import trainImage from '../assets/images/train-image.jpg';
import flightImage from '../assets/images/flight-image.png';

const Transport = () => {
  return (
    <div>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          marginTop: '30px',
          marginBottom: '30px', 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          color: 'gray', // Responsive typography
        }}
      >
        Choose Your Transport
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {/* Bus Card */}
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image={busImage}
              alt="Bus"
              sx={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: { xs: '150px', sm: '200px' }, // Adjust image height for smaller screens
              }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Bus</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Affordable and convenient travel by bus.
              </Typography>
              <Button variant="contained" sx={{ marginTop: '10px' }}>Book Now</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Train Card */}
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image={trainImage}
              alt="Train"
              sx={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: { xs: '150px', sm: '200px' }, // Adjust image height for smaller screens
              }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Train</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Comfortable and scenic train journeys.
              </Typography>
              <Button variant="contained" sx={{ marginTop: '10px' }}>Book Now</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Flight Card */}
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image={flightImage}
              alt="Flight"
              sx={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: { xs: '150px', sm: '200px' }, // Adjust image height for smaller screens
              }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Flight</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Fast and convenient air travel options.
              </Typography>
              <Button variant="contained" sx={{ marginTop: '10px' }}>Book Now</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Transport;
