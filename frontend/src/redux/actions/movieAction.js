// src/redux/actions/movieActions.js
import axios from 'axios';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

// Action to fetch movies from the backend
export const fetchMovies = (page) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_MOVIES_REQUEST });
        try {
            // Adjust the URL to point to your Spring Boot backend
            const response = await axios.get(`http://localhost:3000/api/get-movies`); //?page=${page}&limit=5` 
            dispatch({ type: FETCH_MOVIES_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_MOVIES_FAILURE, payload: error.message });
        }
    };
};