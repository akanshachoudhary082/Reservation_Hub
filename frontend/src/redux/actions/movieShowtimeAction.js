export const FETCH_SHOWTIMES_REQUEST = 'FETCH_SHOWTIMES_REQUEST';
export const FETCH_SHOWTIMES_SUCCESS = 'FETCH_SHOWTIMES_SUCCESS';
export const FETCH_SHOWTIMES_FAILURE = 'FETCH_SHOWTIMES_FAILURE';

export const fetchShowtimesRequest = () => ({
    type: FETCH_SHOWTIMES_REQUEST,
});

export const fetchShowtimesSuccess = (showtimes) => ({
    type: FETCH_SHOWTIMES_SUCCESS,
    payload: showtimes,
});

export const fetchShowtimesFailure = (error) => ({
    type: FETCH_SHOWTIMES_FAILURE,
    payload: error,
});