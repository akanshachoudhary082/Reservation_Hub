import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // For routing
import { Container } from '@mui/material';
import Navbar from './components/Navbar';  
import Footer from './components/Footer';  
import Home from './pages/Home';  
import AboutUs from './pages/AboutUs';
import Transport from './pages/Transport';  
import TransportServiceDetails from './pages/TransportServiceDetails';
import TransportSeatSelectionPage from './pages/TransportSeatSelectionPage';
import TransportBookingPage from './pages/TransportBookingPage';
import TransportPaymentPage from './pages/TransportPaymentPage';
import ContactUs from './pages/ContactUs'; 
import '../src/assets/styles/style.scss';
import MobileNumberForm from '../src/components/MobileNumberForm';
import OtpInput from './components/OtpInput';
import OtpSuccessPage from './pages/OtpSuccessPage';
import CitySelectionPopUp from './components/CitySelectionPopup';
import Movies from './pages/Movies';
import RegisterForm from './pages/RegisterForm';
import MyAccount from './pages/MyAccount';
import Events from './pages/Events';
import MovieShowtimes from './components/MovieShowtimes';
import Login from './pages/Login'
import { useLocation } from 'react-router-dom';



const BackgroundWrapper = ({ children }) => {
  const location = useLocation();  

  
  const isHomeOrTransport = location.pathname === '/' || location.pathname === '/transport';

  return (
    <div className={isHomeOrTransport ? 'background-home-transport' : ''}>
      {children}
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <BackgroundWrapper> {/* Apply conditional class */}
        <Container className='container'></Container>

        <Container sx={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/details/:transport" element={<TransportServiceDetails />} />
            <Route path="/seats/:transport" element={<TransportSeatSelectionPage />} />
            <Route path="/transport-booking" element={<TransportBookingPage />} />
            <Route path="/transport-payment" element={<TransportPaymentPage />} />
            <Route path="/movies" element={<CitySelectionPopUp />} /> {/* City selection for movies */}
            <Route path="/movies/:city" element={<Movies />} /> {/* Movies page with city */}
            <Route path="/events" element={<CitySelectionPopUp />} />
            <Route path="/events/:city" element={<Events />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp-sent" element={<OtpInput />} />
            <Route path="/success" element={<OtpSuccessPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/movies/:startPoint" element={<MovieShowtimes />} /> {/* Showtimes for selected movie */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Container>
        </BackgroundWrapper>
        <Footer />
      </div>
    </Router>
  );
};

export default App;