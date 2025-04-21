import { FETCH_SHOWTIMES_REQUEST, FETCH_SHOWTIMES_SUCCESS, FETCH_SHOWTIMES_FAILURE } from '../actions/movieShowtimeAction';

const initialState = {
    loading: false,
    showtimes: [],
    error: null,
};

const movieShowtimesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SHOWTIMES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SHOWTIMES_SUCCESS:
            return { ...state, loading: false, showtimes: action.payload };
        case FETCH_SHOWTIMES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default movieShowtimesReducer;