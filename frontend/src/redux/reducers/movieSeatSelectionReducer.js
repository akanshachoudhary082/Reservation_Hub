import {
    FETCH_SEATS_REQUEST,
    FETCH_SEATS_SUCCESS,
    FETCH_SEATS_FAILURE,
    SELECT_SEAT,
} from '../actions/movieSeatSelectionAction';

const initialState = {
    loading: false,
    seats: [],
    error: null,
};

const movieSeatSelectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEATS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SEATS_SUCCESS:
            return {
                ...state,
                loading: false,
                seats: action.payload,
            };
        case FETCH_SEATS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SELECT_SEAT:
            return {
                ...state,
                seats: state.seats.map(seat =>
                    seat.number === action.payload
                        ? { ...seat, isSelected: !seat.isSelected }
                        : seat
                ),
            };
        default:
            return state;
    }
};

export default movieSeatSelectionReducer;