export const SET_EVENTS_REQUEST = 'SET_EVENTS_REQUEST';
export const SET_EVENTS_SUCCESS = 'SET_EVENTS_SUCCESS';
export const SET_EVENTS_FAILURE = 'SET_EVENTS_FAILURE';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export const setSelectedCity = (city) => ({
    type: SET_SELECTED_CITY,
    payload: city,
});

export const fetchEventsRequest = () => ({
    type: SET_EVENTS_REQUEST,
});

export const fetchEventsSuccess = (events) => ({
    type: SET_EVENTS_SUCCESS,
    payload: events,
});

export const fetchEventsFailure = (error) => ({
    type: SET_EVENTS_FAILURE,
    payload: error,
});