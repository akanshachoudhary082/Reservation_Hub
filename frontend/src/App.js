import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // For routing

/* Material-UI Components - Start */
import { Container } from '@mui/material';
/* Material-UI Components - End */

/* Custom Components - Start */
import Navbar from './components/Navbar';  // Importing the Navbar component
import Footer from './components/Footer';  // Importing the Footer component
import Home from './pages/Home';  // Home page
import AboutUs from './pages/AboutUs';
import Transport from './pages/Transport';  // Transport page
import Movies from './pages/Movies';  // Theatre page
import Events from './pages/Events';  // Event page
import ContactUs from './pages/ContactUs'; // Contact Us page
import SignIn from './pages/SignIn';  // SignIn page
import '../src/assets/styles/style.scss';
import MobileNumberForm from '../src/components/MobileNumberForm';
import OtpInput from './components/OtpInput';
import OtpSuccessPage from './pages/OtpSuccessPage';
import Register from './pages/Register';  // Register page
import SelectCity from './components/SelectCity';
import MovieCarousel from './components/MovieCarousel';
/* Custom Components - End */

const App = () => {
  return (
    <Router>
      <div className='background'>
      <Navbar />  {/* Navbar that will be shown across all pages */}

<Container  className='container'> {/* Add minHeight to make sure footer stays at the bottom */}</Container>

<Container sx={{ minHeight: '80vh' }}> {/* Add minHeight to make sure footer stays at the bottom */}

  <Routes>
    <Route path="/" element={<Home />} />  {/* Home Page */}
    <Route path="/" element={<MovieCarousel />} />
    <Route path="/aboutUs" element={<AboutUs />} /> 
    <Route path="/transport" element={<Transport />} />  {/* Transport Service */}
    <Route path="/movies" element={<Movies />} />  {/* Theatre Service */}
    <Route path="/events" element={<Events />} />  {/* Events Service */}
    <Route path="/contactus" element={<ContactUs />} />  {/* Contact Us */}
    <Route path="/login" element={<MobileNumberForm />} />  {/* Login page */}
    <Route path="/signin" element={< SignIn/>} /> 
    <Route path="/otp-sent" element={<OtpInput />} />
    <Route path="/success" element={<OtpSuccessPage />} />
    <Route path="/register" element={<Register />} />  {/* Register page */}
    <Route path="/select-city" element={<SelectCity />} />
    <Route path="*" element={<div>404 - Page Not Found</div>} /> {/* Catch-all for 404 */}
  </Routes>
</Container>
<Footer />  {/* Footer displayed at the bottom */}

      </div>
      
    </Router>
  );
};

export default App;
