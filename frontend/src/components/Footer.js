import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
//import './Footer.scss';


const Footer = () => {

    
    const currentYear = new Date().getFullYear();
    
  return (
    <Box className='header__footer__background'
               >
      <Divider sx={{ borderColor: 'white' }} />

      {/* Footer Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
        
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: 2, sm: 0 } }}>
          <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} />
        </Box>

        {/* About Us Section */}
        <Box sx={{ flex: 1, marginBottom: { xs: 2, sm: 0 }, paddingLeft:2 }}>
          <Typography variant="h6">About Us</Typography>
          <Typography variant="body2"  sx={{ marginTop: 2 }}>
            We are committed to providing the best service.
            Learn more about our mission, vision, and
            values here.
          </Typography>
        </Box>

        {/* Quick Links Section */}
        <Box sx={{ flex: 1, marginBottom: { xs: 2, sm: 0 } }}>
          <Typography variant="h6">Quick Links</Typography>
          <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: 'block',marginBottom:1  }}>
            Home
          </Link>
          <Link component={RouterLink} to="/about" color="inherit" underline="hover" sx={{ display: 'block',marginBottom:1  }}>
            About
          </Link>
          <Link component={RouterLink} to="/contactus" color="inherit" underline="hover" sx={{ display: 'block',marginBottom:1  }}>
            Contact Us
          </Link>
          <Link component={RouterLink} to="/privacy" color="inherit" underline="hover" sx={{ display: 'block' }}>
            Privacy Policy
          </Link>
        </Box>

        {/* Social Media Links Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Follow Us</Typography>
          <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom:1 }}>
          <FacebookIcon sx={{ marginRight: 1}} />
            Facebook
          </Link>
          <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom:1  }}>
          <TwitterIcon sx={{ marginRight: 1}} />
            Twitter
          </Link>
          <Link href="#" color="inherit" underline="hover" sx={{ display: 'block' , marginBottom:1}}>
          <InstagramIcon sx={{ marginRight: 1}} />
            Instagram
           
          </Link>
          <Link href="#" color="inherit" underline="hover" sx={{ display: 'block' }}>
          <LinkedInIcon sx={{marginRight: 1}} />
          LinkedIn
          </Link>
        </Box>
      </Box>

      {/* Footer Text */}
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="inherit">
          © {currentYear} Your Company. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;


