import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieCarousel = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { movies, loading, error } = useSelector(state => state);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchMovies = async () => {
            dispatch({ type: 'FETCH_MOVIES_REQUEST' });
            try {
                const response = await axios.get(`http://localhost:3000/get-movies`);
                dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data });
            } catch (error) {
                dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
            }
        };

        fetchMovies();
    }, [dispatch]);

    const handleNext = () => {
        if (currentIndex + itemsPerPage < movies.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const handleShowMore = () => {
        history.push('/movies'); // Navigate to the Movies page
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : Array.isArray(movies) && movies.length > 0 ? (
                <div>
                    <div className="carousel">
                        <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
                        <div className="carousel-items">
                            {movies.slice(currentIndex, currentIndex + itemsPerPage).map(movie => (
                                <div key={movie.id} className="movie-item">
                                    <a href={`/movies/${movie.id}`}> {/* Link to movie details page */}
                                        <img src={movie.picture} alt={movie.name} /> {/* Correctly access movie picture */}
                                        <h3>{movie.name}</h3> {/* Correctly access movie name */}
                                    </a>
                                </div>                              
                            ))}
                        </div>
                        <button onClick={handleNext} disabled={currentIndex + itemsPerPage >= movies.length}>Next</button>
                    </div>
                    <button onClick={handleShowMore}>Show more...</button> {/* Link to Movies page */}
                </div>
            ) : (
                <p>No movies available</p>
            )}
        </div>
    );
};

export default MovieCarousel;