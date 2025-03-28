// src/redux/reducers/transportReducer.js

import {
    FETCH_TRANSPORT_REQUEST,
    FETCH_TRANSPORT_SUCCESS,
    FETCH_TRANSPORT_FAILURE,
  } from '../actions/transportActions';
  
  const initialState = {
    loading: false,
    transportServices: [], // To store transport data (e.g., Bus, Train, Flight)
    error: null,
  };
  
  const transportReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRANSPORT_REQUEST:
        return { ...state, loading: true };
      case FETCH_TRANSPORT_SUCCESS:
        return { ...state, loading: false, transportServices: action.payload };
      case FETCH_TRANSPORT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default transportReducer;
  