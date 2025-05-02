import {
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAILURE,
    RESET_BOOKING_STATE
  } from './transportBookingActionTypes';
  import axios from 'axios';
  
  export const bookTransport = (bookingData) => async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });
  
    try {
      const response = await axios.post('/api/booking', bookingData);
      dispatch({ type: BOOKING_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: BOOKING_FAILURE, payload: error.message });
    }
  };
  
  export const resetBookingState = () => ({
    type: RESET_BOOKING_STATE
  });
  