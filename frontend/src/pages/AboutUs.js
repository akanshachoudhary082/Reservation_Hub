// import React from 'react';
// import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router

// const AboutUs = () => {
//   const navigate = useNavigate(); // Initialize navigate for programmatic routing

//   const handleContactRedirect = () => {
//     navigate('/contactus'); // Redirect to the Contact Us page
//   };

//   return (
//     <Container sx={{ mt: 5, bgcolor: '#fff', color: '#000', minHeight: '100vh' }}>
//       {/* Space between the "About Us" heading and the content */}
//       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5 }}>
//         About Us
//       </Typography>

//       {/* Space between the paragraph and the cards */}
//       <Typography variant="body1" paragraph align="center" sx={{ mb: 9 }}>
//         We are a passionate team committed to providing the best services in transport, events, movies, and much more.
//       </Typography>

//       {/* Grid for mission, vision, values cards */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Paper sx={{ padding: 3, textAlign: 'center' }}>
//             <Typography variant="h5" gutterBottom>
//               Our Mission
//             </Typography>
//             <Typography variant="body2">
//               Our mission is to offer the most reliable and accessible services to help you travel and enjoy entertainment experiences with ease.
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Paper sx={{ padding: 3, textAlign: 'center' }}>
//             <Typography variant="h5" gutterBottom>
//               Our Vision
//             </Typography>
//             <Typography variant="body2">
//               We aim to be the leading provider of integrated services, delivering seamless travel, entertainment, and leisure experiences for everyone.
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Paper sx={{ padding: 3, textAlign: 'center' }}>
//             <Typography variant="h5" gutterBottom>
//               Our Values
//             </Typography>
//             <Typography variant="body2">
//               We believe in integrity, customer satisfaction, and innovation. Our team works tirelessly to create unforgettable experiences for you.
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Space below the cards */}
//       <Box sx={{ textAlign: 'center', mt: 5 }}>
//         <Typography variant="h6" gutterBottom>
//           Get in touch with us to know more about our services!
//         </Typography>

//         {/* Button to redirect to Contact Us page */}
//         <Button 
//           variant="contained" 
//           color="primary" 
//           size="large"
//           onClick={handleContactRedirect}  // On click, navigate to contactus page
//         >
//           Contact Us
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AboutUs;


import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router
import '../assets/styles/about.scss';

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize navigate for programmatic routing

  const handleContactRedirect = () => {
    navigate('/contactus'); // Redirect to the Contact Us page
  };

  return (
    <Container className="about-us-container">
      {/* Space between the "About Us" heading and the content */}
      <Typography variant="h4" className="about-us-title">
        About Us
      </Typography>

      {/* Space between the paragraph and the cards */}
      <Typography variant="body1" paragraph className="about-us-description">
        We are a passionate team committed to providing the best services in transport, events, movies, and much more.
      </Typography>

      {/* Grid for mission, vision, values cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card-paper">
            <Typography variant="h5" className="card-title">
              Our Mission
            </Typography>
            <Typography variant="body2" className="card-description">
              Our mission is to offer the most reliable and accessible services to help you travel and enjoy entertainment experiences with ease.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card-paper">
            <Typography variant="h5" className="card-title">
              Our Vision
            </Typography>
            <Typography variant="body2" className="card-description">
              We aim to be the leading provider of integrated services, delivering seamless travel, entertainment, and leisure experiences for everyone.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card-paper">
            <Typography variant="h5" className="card-title">
              Our Values
            </Typography>
            <Typography variant="body2" className="card-description">
              We believe in integrity, customer satisfaction, and innovation. Our team works tirelessly to create unforgettable experiences for you.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Space below the cards */}
      <Box className="contact-button-container">
        <Typography variant="h6" gutterBottom>
          Get in touch with us to know more about our services!
        </Typography>

        {/* Button to redirect to Contact Us page */}
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          className="contact-button"
          onClick={handleContactRedirect}  // On click, navigate to contactus page
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;

