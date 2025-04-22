import {
    SET_EVENTS_REQUEST,
    SET_EVENTS_SUCCESS,
    SET_EVENTS_FAILURE,
    SET_SELECTED_CITY,
} from '../actions/eventAction';

const initialState = {
    loading: false,
    events: [],
    error: null,
    selectedCity: null, 
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SET_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
            };
        case SET_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.payload, 
            };
        default:
            return state;
    }
};

export default eventReducer;