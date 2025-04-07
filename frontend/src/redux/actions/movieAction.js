// src/redux/actions/movieActions.js
import axios from 'axios';

export const SET_MOVIES_REQUEST = 'SET_MOVIES_REQUEST';
export const SET_MOVIES_SUCCESS = 'SET_MOVIES_SUCCESS';
export const SET_MOVIES_FAILURE = 'SET_MOVIES_FAILURE';

// Action to fetch movies from the backend
export const fetchMovies = (city) => {
    return async (dispatch) => {
        dispatch({ type: SET_MOVIES_REQUEST });
        try {
            // Adjust the URL to point to your Spring Boot backend
            const response = await axios.get(`http://localhost:3000/movies/get-movies`, {
                params: { city },
            }); 
            dispatch({ type: SET_MOVIES_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: SET_MOVIES_FAILURE, payload: error.message });
        }
    };
};