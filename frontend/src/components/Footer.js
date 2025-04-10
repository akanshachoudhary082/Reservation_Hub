// Footer.jsx
import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../assets/images/Reservation_Hub_Logo.jpg';
import '../assets/styles/footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box className="footer-container">
      <Divider />
      <Box className="footer-layout">
        {/* Logo */}
        <Box className="footer-logo">
          <img src={logo} alt="Logo" />
        </Box>

        {/* About Us */}
        <Box style={{ flex: 1, paddingLeft: '16px' }}>
          <Typography variant="h6" className="footer-heading">About Us</Typography>
          <Typography variant="body2" className="footer-text">
            We are committed to providing the best service. Learn more about our mission, vision, and values here.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box style={{ flex: 1 }}>
          <Typography variant="h6" className="footer-heading">Quick Links</Typography>
          {[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Contact Us', to: '/contactus' },
            { label: 'Privacy Policy', to: '/privacy' },
          ].map((item) => (
            <Link
              key={item.label}
              component={RouterLink}
              to={item.to}
              underline="none"
              color="inherit"
              className="footer-link"
            >
              {item.label}
            </Link>
          ))}
        </Box>

        {/* Social Media Links */}
        <Box style={{ flex: 1 }}>
          <Typography variant="h6" className="footer-heading">Follow Us</Typography>
          {[
            { icon: <FacebookIcon />, label: 'Facebook', className: 'facebook' },
            { icon: <TwitterIcon />, label: 'Twitter', className: 'twitter' },
            { icon: <InstagramIcon />, label: 'Instagram', className: 'instagram' },
            { icon: <LinkedInIcon />, label: 'LinkedIn', className: 'linkedin' },
          ].map((item) => (
            <Link
              key={item.label}
              href="#"
              underline="none"
              color="inherit"
              className={`footer-social-link ${item.className}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Footer Bottom Text */}
      <Box className="footer-bottom-text">
        <Typography variant="body2">
          © {currentYear} Reservation Hub. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
