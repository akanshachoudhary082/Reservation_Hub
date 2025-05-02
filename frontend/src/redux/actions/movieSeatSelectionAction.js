export const FETCH_SEATS_REQUEST = 'FETCH_SEATS_REQUEST';
export const FETCH_SEATS_SUCCESS = 'FETCH_SEATS_SUCCESS';
export const FETCH_SEATS_FAILURE = 'FETCH_SEATS_FAILURE';
export const SELECT_SEAT = 'SELECT_SEAT';

export const fetchSeatsRequest = () => ({
    type: FETCH_SEATS_REQUEST,
});

export const fetchSeatsSuccess = (seats) => ({
    type: FETCH_SEATS_SUCCESS,
    payload: seats,
});

export const fetchSeatsFailure = (error) => ({
    type: FETCH_SEATS_FAILURE,
    payload: error,
});

export const selectSeat = (seatNumber) => ({
    type: SELECT_SEAT,
    payload: seatNumber,
});