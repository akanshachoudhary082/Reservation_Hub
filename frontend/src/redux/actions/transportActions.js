import { SET_TRANSPORT_DATA, SET_LOADING, SET_ERROR } from './transportActionTypes';

// Action creator to set transport data
export const setTransportData = (data) => ({
  type: SET_TRANSPORT_DATA,
  payload: data,
});

// Action creator to set loading state
export const setLoading = () => ({
  type: SET_LOADING,
});

// Action creator to set error message
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
