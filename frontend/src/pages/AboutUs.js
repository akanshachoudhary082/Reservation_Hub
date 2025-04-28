import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import '../assets/styles/about.scss';

const AboutUs = () => {
  const navigate = useNavigate(); 

  const handleContactRedirect = () => {
    navigate('/contactus'); 
  };

  return (
    <Container className="about-us-container">
      
      {/* <Typography variant="h4" className="about-us-title">
        About Us
      </Typography> */}
      <Typography 
    variant="h4" 
    className="about-us-title"
    sx={{ 
      textAlign: 'center', 
      marginBottom: '2rem', 
      fontWeight: 'bold', 
      fontFamily: "Bebas Neue", 
      color: 'white', 
      fontSize:'3rem',
    }}
  >
    About Us
  </Typography>

     
  <Typography 
    variant="body1" 
    paragraph 
    className="about-us-description"
    sx={{ 
      textAlign: 'center', 
      marginBottom: '3rem', 
      fontSize: '1.1rem', 
      fontFamily: "'Nunito', sans-serif", 
      color: 'white' 
    }}
  >
    We are a passionate team committed to providing the best services in transport, events, movies, and much more.
  </Typography>
     
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

      
      <Box className="contact-button-container">
        <Typography variant="h6" gutterBottom>
          Get in touch with us to know more about our services!
        </Typography>

        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          className="contact-button"
          onClick={handleContactRedirect}  
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;

