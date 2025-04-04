import { SET_SERVICE_DETAILS, SET_LOADING, SET_ERROR } from './transportServiceDetailActionType'; // Ensure correct path to action types

export const setServiceDetails = (details) => ({
  type: SET_SERVICE_DETAILS,
  payload: details
});

export const setLoading = () => ({
  type: SET_LOADING
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});
