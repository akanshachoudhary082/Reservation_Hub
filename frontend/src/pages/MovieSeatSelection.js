import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatsRequest, fetchSeatsSuccess, fetchSeatsFailure } from '../redux/actions/movieSeatSelectionAction';
import { Typography, Button } from '@mui/material';
import MovieSeat from '../components/MovieSeat';
import axios from 'axios';
import TheatersIcon from '@mui/icons-material/Theaters';
import '../assets/styles/MovieSeatSelection.scss'; // Import the SCSS file
import screenImage from '../assets/images/Movies_Screen.png';
import Cookies from 'js-cookie';

const MovieSeatSelection = () => {
    const { description, city, time, theaterName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, seats, error } = useSelector(state => state.movieSeatSelection);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            const token = Cookies.get('jwtToken');
            dispatch(fetchSeatsRequest());
            try {
                const response = await axios.get(`https://localhost:8443/movies/get-seats/${city}/${description}/${theaterName}/${time}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                dispatch(fetchSeatsSuccess(response.data));
            } catch (error) {
                dispatch(fetchSeatsFailure(error.message));
            }
        };

        fetchSeats();
    }, [city, description, theaterName, time, dispatch]);

    if (loading) {
        return <div className="loading">Loading seats...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const handleSeatSelect = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            // Deselect the seat
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            // Select the seat
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleBuyTickets = () => {
        // Redirect to sign-up page with movie and seat details
        navigate({
            pathname: '/register', // Adjust the path to your sign-up page
            state: {
                movie: description,
                seats: selectedSeats,
                city,
                theaterName,
                time
            }
        });
    };

    // Assuming all seats have the same price, get it from the first seat
    const firstSeat = seats[0];
    const ticketPrice = firstSeat ? firstSeat.seatPrice : 0;
    const totalPrice = selectedSeats.length * ticketPrice;

    // Display ticket information
    const ticketInfo = firstSeat ? `Rs. ${ticketPrice} - ${firstSeat.seatType}` : '';

    return (
        <div className="movie-seat-selection">
            <Typography variant="h3" gutterBottom>
                <TheatersIcon sx={{ marginRight: 1 }} />
                {description}
            </Typography>
            <Typography variant="h4">Select Your Seats</Typography>
            <div className="ticket-info">
                <Typography variant="body1" color='white'>
                    {ticketInfo}
                </Typography>
            </div>
            <div className="seat-grid">
                {seats.map((seat) => (
                    <div className="seat" key={seat.seatNumber}>
                        <MovieSeat
                            seatNumber={seat.seatNumber}
                            isSelected={selectedSeats.includes(seat.seatNumber)}
                            onSelect={handleSeatSelect}
                            status={seat.status} // Pass the status prop
                        />
                    </div>
                ))}
            </div>
            <img src={screenImage} alt="Screen" className="screen-image" />
            <Typography variant="h6" gutterBottom>
                All eyes this way please!
            </Typography>
            {selectedSeats.length > 0 && (
                <div className='button-container'>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleBuyTickets}
                >
                    Pay Rs. {totalPrice}
                </Button>
                </div>
            )}
        </div>
    );
};

export default MovieSeatSelection;