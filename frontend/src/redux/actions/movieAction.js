// src/redux/actions/movieActions.js

// Action Types
export const SET_MOVIES_REQUEST = 'SET_MOVIES_REQUEST';
export const SET_MOVIES_SUCCESS = 'SET_MOVIES_SUCCESS';
export const SET_MOVIES_FAILURE = 'SET_MOVIES_FAILURE';

// Action Creators
export const setMoviesRequest = () => ({
    type: SET_MOVIES_REQUEST,
});

export const setMoviesSuccess = (movies) => ({
    type: SET_MOVIES_SUCCESS,
    payload: movies,
});

export const setMoviesFailure = (error) => ({
    type: SET_MOVIES_FAILURE,
    payload: error,
});