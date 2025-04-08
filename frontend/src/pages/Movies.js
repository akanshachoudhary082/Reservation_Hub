// src/components/Movies.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMoviesSuccess, setMoviesFailure } from '../redux/actions/movieAction'; // Import the action creators
import '../assets/styles/Movies.scss';
import axios from 'axios';

const Movies = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city'); // Get the city from the URL

    const dispatch = useDispatch();
    const { movieCatalog, loading, error } = useSelector(state => state); // Access movies state from Redux
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            if (city) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`http://get-movies/movies?city=${city}`);
                    dispatch(setMoviesSuccess(response.data));
                } catch (error) {
                    dispatch(setMoviesFailure(error.message));
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchMovies();
    }, [city, dispatch]); // Dependency array includes city and dispatch

    return (
        <div>
            <h1>Movies in {city}</h1>
            {isLoading && <p>Loading movies...</p>}
            {error && <p>Error: {error}</p>}
            <div className="movie-catalog">
                {movieCatalog.length > 0 ? (
                    movieCatalog.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p>
                            {/* Add more movie details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No movies found for this city.</p>
                )}
            </div>
        </div>
    );
};

export default Movies;