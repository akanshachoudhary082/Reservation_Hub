import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions'; // Import the action
import '../assets/styles/Movies.scss';

const Movies = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city'); // Get the city from the URL

    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector(state => state.movies); // Access movies state from Redux

    useEffect(() => {
        if (city) {
            dispatch(fetchMovies(city)); // Dispatch the action to fetch movies
        }
    }, [city, dispatch]); // Dependency array includes city and dispatch

    return (
        <div>
            <h1>Movies in {city}</h1>
            {loading && <p>Loading movies...</p>}
            {error && <p>Error: {error}</p>}
            <div className="movie-catalog">
                {movies.length > 0 ? (
                    movies.map((movie) => (
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