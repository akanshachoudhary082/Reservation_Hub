// src/pages/Home.js

import React from 'react';
import Transport from './Transport'; // Import the Transport component
import '../assets/styles/style.scss';
import MovieCarousel from '../components/MovieCarousel';
 
const Home = () => {
  return (
    <div>
      <div>
      <Transport />
      <MovieCarousel />
      </div>
    </div>
  );
};

export default Home;
