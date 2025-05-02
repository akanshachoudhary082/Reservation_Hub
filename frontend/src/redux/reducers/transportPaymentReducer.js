// src/redux/transportPayment/reducer.js
import { SET_PAYMENT_DETAILS, SET_PAYMENT_LOADING, SET_PAYMENT_ERROR } from '../actions/transportPaymentActionTypes';

const initialState = {
  payment: null,
  loading: false,
  error: null,
};

const transportPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_LOADING:
      return { ...state, loading: true, error: null };

    case SET_PAYMENT_DETAILS:
      return { ...state, loading: false, payment: action.payload, error: null };

    case SET_PAYMENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default transportPaymentReducer;
