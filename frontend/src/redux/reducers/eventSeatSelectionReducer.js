import {
    FETCH_SEATS_REQUEST,
    FETCH_SEATS_SUCCESS,
    FETCH_SEATS_FAILURE,
} from '../actions/eventSeatSelectionAction';

// Initial State
const initialState = {
    loading: false,
    seats: [],
    error: null,
};

// Reducer Function
const eventSeatSelectionReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};

export default eventSeatSelectionReducer;