// src/components/MovieShowtimes.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import '../assets/styles/MovieShowtime.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowtimesRequest, fetchShowtimesSuccess, fetchShowtimesFailure } from '../redux/actions/movieShowtimeAction';

const MovieShowtimes = () => {
    const dispatch = useDispatch();
    const { loading, showtimes, error } = useSelector((state) => state.movieShowtimes); // Update to use the correct state slice
    const { description } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const city = query.get('city');

    useEffect(() => {
        const fetchShowtimes = async () => {
            dispatch(fetchShowtimesRequest()); // Dispatch request action
            try {
                const response = await axios.get(`http://localhost:8080/movies/get-showtimes/${description}?city=${city}`);
                dispatch(fetchShowtimesSuccess(response.data)); // Dispatch success action with data
            } catch (error) {
                dispatch(fetchShowtimesFailure(error.message)); // Dispatch failure action with error message
            }
        };

        fetchShowtimes();
    }, [description, city, dispatch]);

    if (loading) {
        return <div>Loading showtimes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Showtimes for {description}
            </Typography>
            <Grid container spacing={2}>
                {showtimes.length > 0 ? (
                    showtimes.map((show) => (
                        <Grid item xs={12} sm={6} md={4} key={show.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{show.theaterName}</Typography>
                                    <Typography variant="body1">Date: {show.date}</Typography>
                                    <Typography variant="body1">Time: {show.time}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No showtimes available for this movie.</Typography>
                )}
            </Grid>
        </div>
    );
};

export default MovieShowtimes;