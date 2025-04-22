export const SET_MOVIES_REQUEST = 'SET_MOVIES_REQUEST';
export const SET_MOVIES_SUCCESS = 'SET_MOVIES_SUCCESS';
export const SET_MOVIES_FAILURE = 'SET_MOVIES_FAILURE';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export const setSelectedCity = (city) => ({
    type: SET_SELECTED_CITY,
    payload: city,
});

export const fetchMoviesRequest = () => ({
    type: SET_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (movies) => ({
    type: SET_MOVIES_SUCCESS,
    payload: movies,
});

export const fetchMoviesFailure = (error) => ({
    type: SET_MOVIES_FAILURE,
    payload: error,
});