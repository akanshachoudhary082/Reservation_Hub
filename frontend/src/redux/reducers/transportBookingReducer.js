import {
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAILURE,
    RESET_BOOKING_STATE
  } from '../actions/transportBookingActionTypes';
  
  const initialState = {
    loading: false,
    error: null,
    successData: null
  };
  
  const transportBookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOOKING_REQUEST:
        return { ...state, loading: true, error: null, successData: null };
      case BOOKING_SUCCESS:
        return { ...state, loading: false, successData: action.payload };
      case BOOKING_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case RESET_BOOKING_STATE:
        return initialState;
      default:
        return state;
    }
  };
  
  export default transportBookingReducer;
  