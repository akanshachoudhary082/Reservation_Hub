import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/Movies.scss';

const Movies = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city'); // Get the city from the URL

    const [movies, setMovies] = useState([]); // State to hold movies
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Reset error state
            try {
                const response = await axios.get(`http://localhost:3000/get-movies`, {
                    params: { city }, // Pass city as a query parameter
                });
                setMovies(response.data); // Set the movies from the response
            } catch (err) {
                setError(err.message); // Set error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        if (city) {
            fetchMovies(); // Fetch movies if city is available
        }
    }, [city]); // Dependency array includes city

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