import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import '../assets/styles/MovieShowtimes.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowtimesRequest, fetchShowtimesSuccess, fetchShowtimesFailure } from '../redux/actions/movieShowtimeAction';
import Cookies from 'js-cookie';

const MovieShowtimes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, showtimes, error } = useSelector((state) => state.movieShowtimes);
    const { description, city } = useParams(); // Get both description and city from params
    
    // State for selected date
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchShowtimes = async () => {
            const token = Cookies.get('jwtToken');
            dispatch(fetchShowtimesRequest());
            try {
                const formattedDate = selectedDate.toLocaleString().timestamp;// Format date to YYYY-MM-DD
                const response = await axios.get(`https://localhost:8443/movies/get-showtimes/${description}?city=${city}&date=${formattedDate}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                dispatch(fetchShowtimesSuccess(response.data));
            } catch (error) {
                dispatch(fetchShowtimesFailure(error.message));
            }
        };

        fetchShowtimes();
    }, [description, city, selectedDate, dispatch]); // Add selectedDate to the dependency array

    if (loading) {
        return <div>Loading showtimes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleTimeClick = (theatreName, timestamp) => {
        console.log("timestamp value:", timestamp); // Log the original timestamp
        //const formattedStartPoint = new Date(timestamp).toISOString().slice(0, 19); // Convert to ISO string
        console.log(`Navigating to: /movies/${city}/${description}/${theatreName}/${timestamp}`);
        navigate(`/movies/${city}/${description}/${theatreName}/${timestamp}`);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? String(hours).padStart(2, '0') : '12'; // the hour '0' should be '12'

        return {
            date: `${day}/${month}/${year}`,
            time: `${hours}:${minutes} ${ampm}` // Add AM/PM
        };
    };

    // Group showtimes by theater and date
    const groupedShowtimes = showtimes.reduce((acc, show) => {
        const { startPoint, name } = show;
        const formattedDate = formatTimestamp(startPoint).date;
        const formattedTime = formatTimestamp(startPoint).time;

        if (!acc[name]) {
            acc[name] = {};
        }
        if (!acc[name][formattedDate]) {
            acc[name][formattedDate] = [];
        }
        // Store both formatted time and original timestamp
        acc[name][formattedDate].push({ time: formattedTime, originalTimestamp: startPoint });
        return acc;
    }, {});

    return (
        <div className='movie-background'> 
            <Typography variant="h4" gutterBottom className="movie-showtime-heading">
                Shows for {description} in {city}
            </Typography>
            
            <Grid direction="column" container spacing={2}>
                {Object.keys(groupedShowtimes).length > 0 ? (
                    Object.keys(groupedShowtimes).map((theatreName) => (
                        Object.keys(groupedShowtimes[theatreName]).map((date) => (
                            <Grid item xs={12} sm={6} md={4} key={`${theatreName}-${date}`}>
                                <Card sx={{ margin: 2, backgroundColor: 'white' }}>
                                    <CardContent>
                                        <Typography variant="h5">{theatreName}</Typography>
                                        <Typography variant="body2" color="text.secondary" display="flex" alignItems=" center">
                                            <CalendarMonthOutlinedIcon sx={{ marginRight: 1 }} />
                                            {date} {/* Display formatted date */}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {groupedShowtimes[theatreName][date].map((showtime, index) => (
                                                <Button 
                                                    key={index} 
                                                    variant="contained" 
                                                    color="primary" 
                                                    onClick={() => handleTimeClick(theatreName, showtime.originalTimestamp)} // Pass the original timestamp
                                                    sx={{ margin: 0.5 }}
                                                >
                                                    {showtime.time} {/* Display formatted time with AM/PM */}
                                                </Button>
                                            ))}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ))
                ) : (
                    <Typography>No showtimes available for this movie.</Typography>
                )}
            </Grid>
        </div>
    );
};

export default MovieShowtimes;