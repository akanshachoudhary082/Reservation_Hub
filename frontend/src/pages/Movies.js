import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } from '../redux/actions/movieAction';
import MovieCard from '../components/MovieCard';
import '../assets/styles/Movies.scss';
import axios from 'axios';
import Grid from '@mui/material/Grid'; 
import Cookies from 'js-cookie';

const Movies = () => {
    const dispatch = useDispatch();
    const { loading, movies, error } = useSelector((state) => state.movies); 
    const selectedCity = useSelector((state) => state.movies.selectedCity); 

    console.log("Selected City:", selectedCity); 

    useEffect(() => {
        const fetchMoviesByCity = async (city) => {

            const token = Cookies.get('jwtToken');

            dispatch(fetchMoviesRequest());
            try {
                const response = await axios.get(`https://localhost:8443/movies/get-movies/${city}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                console.log(response.data); 
                dispatch(fetchMoviesSuccess(response.data)); 
            } catch (error) {
                console.error("Error fetching movies:", error); 
                dispatch(fetchMoviesFailure(error.message));
            }
        };

        if (selectedCity) { 
            fetchMoviesByCity(selectedCity); 
        }
    }, [selectedCity, dispatch]);

    if (loading) {
        return <div>Loading movies...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='movie-background'>
            <h1>Movies in {selectedCity}</h1>
            <Grid container spacing={2} justifyContent="center"> {/* Use Grid for layout */}
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} key={movie.description}> {/* Responsive grid item */}
                            <MovieCard movie={movie} city={selectedCity} /> 
                        </Grid>
                    ))
                ) : (
                    <p>No movies are scheduled currently for {selectedCity}</p>
                )}
            </Grid>
        </div>
    );
};

export default Movies;