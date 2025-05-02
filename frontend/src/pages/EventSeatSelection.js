import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatsRequest, fetchSeatsSuccess, fetchSeatsFailure } from '../redux/actions/eventSeatSelectionAction'; // Adjust the import based on your action file
import '../assets/styles/EventSeatSelection.scss';

const EventSeatSelection = () => {
    const { description, city, time, theaterName } = useParams(); // Extract parameters from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, seats, error } = useSelector(state => state.movieSeatSelection);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            const token = Cookies.get('jwtToken'); // Get the JWT token from cookies
            dispatch(fetchSeatsRequest());
            try {
                const response = await axios.get(`https://localhost:8443/events/get-seats/${city}/${description}/${theaterName}/${time}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(fetchSeatsSuccess(response.data)); // Dispatch success action with fetched data
            } catch (error) {
                console.error('Error fetching seats:', error);
                dispatch(fetchSeatsFailure(error.message)); // Dispatch failure action with error message
            }
        };

        fetchSeats();
    }, [city, description, theaterName, time, dispatch]);

    if (loading) {
        return <CircularProgress />; // Show a loading spinner
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    const handleSelectSeat = (seatType) => {
        // Logic to handle seat selection
        //console.log(`Selected seat type: ${seatType.type}`);
        setSelectedSeats(prev => [...prev, seatType]);
    };

    return (
        <div>
            <Typography variant="h4" color='white'>{description}</Typography>
            <Typography variant="h6" color='white'>Venue: {theaterName}</Typography>
            <Typography variant="body1" color='white'>Date: {new Date(time).toLocaleString()}</Typography>
            <Typography variant="body1" color='white'>City: {city}</Typography>
            <div className='seat-selection-container'>
            
            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                {seats.length > 0 ? (
                    seats.map((seatType) => (
                        
                        <Grid item xs={12} sm={6} md={4} key={seatType.seatNumber}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{seatType.seatType}</Typography>
                                    <Typography variant="body2">Rs.{seatType.seatPrice}</Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        style={{ marginTop: '10px' }} 
                                        onClick={() => handleSelectSeat(seatType)}
                                    >
                                        Select {seatType.seatType}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">No seat types available for this event.</Typography>
                )}
            </Grid>
        </div>

        </div>
        
    );
};

export default EventSeatSelection;