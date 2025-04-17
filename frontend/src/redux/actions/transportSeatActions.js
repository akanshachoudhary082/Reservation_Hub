import { SET_TRANSPORT_SEATS, SET_TRANSPORT_SEATS_ERROR, SET_LOADING, SELECT_TRANSPORT_SEAT } from './transportSeatActionTypes';


export const setTransportSeats = (seats) => {
  return {
    type: SET_TRANSPORT_SEATS,
    payload: seats, 
  };
};


export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};


export const setTransportSeatsError = (error) => {
  return {
    type: SET_TRANSPORT_SEATS_ERROR,
    payload: error,
  };
};

export const selectTransportSeat = (seatId) => {
  return {
    type: SELECT_TRANSPORT_SEAT,
    payload: seatId, 
  };
};
