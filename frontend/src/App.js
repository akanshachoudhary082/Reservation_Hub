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
import TransportServiceDetails from './pages/TransportServiceDetails';
import ContactUs from './pages/ContactUs'; // Contact Us page
import SignIn from './pages/SignIn';  // SignIn page
import '../src/assets/styles/style.scss';
import MobileNumberForm from '../src/components/MobileNumberForm';
import OtpInput from './components/OtpInput';
import OtpSuccessPage from './pages/OtpSuccessPage';
import Register from './pages/Register';
import CitySelectionPopUp from './components/CitySelectionPopup';
import MovieCarousel from './components/MovieCarousel';
/* Custom Components - End */

const App = () => {
  return (
    <Router>
      <div className='background'>
        <Navbar />

        <Container className='container'> </Container>

        <Container sx={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<MovieCarousel />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/details/:id" element={<TransportServiceDetails />} />
            <Route path="/movies" element={<CitySelectionPopUp />} />
            <Route path="/events" element={<CitySelectionPopUp />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<MobileNumberForm />} />
            <Route path="/signin" element={< SignIn />} />
            <Route path="/otp-sent" element={<OtpInput />} />
            <Route path="/success" element={<OtpSuccessPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
