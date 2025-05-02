import React from 'react';
import { Button } from '@mui/material';
import '../assets/styles/MovieSeat.scss'; // Import the SCSS file

const MovieSeat = ({ seatNumber, status, onSelect, isSelected }) => {
    const handleClick = () => {
        if (status === 'AVAILABLE') {
            onSelect(seatNumber);
        }
    };

    // Determine the class based on the status and selection state
    const seatClass = isSelected 
        ? 'selected' 
        : (status === 'BOOKED' ? 'booked' : (status === 'AVAILABLE' ? 'available' : ''));

    return (
        <Button
            className={`movie-seat ${seatClass}`}
            onClick={handleClick}
            disabled={status === 'BOOKED'} // Disable button if booked
        >
            {seatNumber}
        </Button>
    );
};

export default MovieSeat;