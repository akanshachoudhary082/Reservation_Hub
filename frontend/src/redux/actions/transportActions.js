import { SET_TRANSPORT_DATA, SET_LOADING, SET_ERROR } from './transportActionTypes';

// Action creator to set transport data
// export const setTransportData = (data) => ({
//   type: SET_TRANSPORT_DATA,
//   payload: data,
// });

// // Action creator to set loading state
// export const setLoading = () => ({
//   type: SET_LOADING,
// });

// // Action creator to set error message
// export const setError = (error) => ({
//   type: SET_ERROR,
//   payload: error,
// });
// src/redux/actions/transportActions.js

export const setPaymentLoading = () => ({
  type: 'PAYMENT_LOADING',
});

export const setPaymentDetails = (data) => ({
  type: 'SET_PAYMENT_DETAILS',
  payload: data,
});

export const setPaymentError = (error) => ({
  type: 'SET_PAYMENT_ERROR',
  error,
});

// If you have other actions like setLoading or setTransportData, they can be included as well
export const setLoading = () => ({
  type: 'SET_LOADING',
});

export const setTransportData = (data) => ({
  type: 'SET_TRANSPORT_DATA',
  payload: data,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});
