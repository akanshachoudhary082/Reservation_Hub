// src/redux/actions/transportActions.js

// Action types
export const FETCH_TRANSPORT_REQUEST = 'FETCH_TRANSPORT_REQUEST';
export const FETCH_TRANSPORT_SUCCESS = 'FETCH_TRANSPORT_SUCCESS';
export const FETCH_TRANSPORT_FAILURE = 'FETCH_TRANSPORT_FAILURE';

// Action creators

// Fetch transport services (mock data)
export const fetchTransportServices = () => (dispatch) => {
  dispatch({ type: FETCH_TRANSPORT_REQUEST });

  // Mock transport data (replace this with actual data later)
  const mockTransportServices = [
    { SERVICE_ID: 1, SERVICE_TYPE: 'Bus', description: 'Comfortable bus ride for long distances', image: 'https://via.placeholder.com/150' },
    { SERVICE_ID: 2, SERVICE_TYPE: 'Train', description: 'Relaxing and scenic train ride', image: 'https://via.placeholder.com/150' },
    { SERVICE_ID: 3, SERVICE_TYPE: 'Flight', description: 'Fast and comfortable air travel', image: 'https://via.placeholder.com/150' },
  ];

  setTimeout(() => {
    // Dispatch success with mock data after a small delay to simulate an API call
    dispatch({
      type: FETCH_TRANSPORT_SUCCESS,
      payload: mockTransportServices,
    });
  }, 1000); // Simulate API call delay
};
