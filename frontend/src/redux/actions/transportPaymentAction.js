// src/redux/transportPayment/actions.js
import { SET_PAYMENT_DETAILS, SET_PAYMENT_LOADING, SET_PAYMENT_ERROR } from '../actions/transportPaymentActionTypes';

// Action creators
export const setPaymentDetails = (details) => ({
  type: SET_PAYMENT_DETAILS,
  payload: details,
});

export const setPaymentLoading = () => ({
  type: SET_PAYMENT_LOADING,
});

export const setPaymentError = (error) => ({
  type: SET_PAYMENT_ERROR,
  payload: error,
});
