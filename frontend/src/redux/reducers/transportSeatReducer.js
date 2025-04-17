const initialState = {
    selectedSeatId: null,
    transportSeats: [],
    loading: false,
    error: null,
  };
  
  const transportSeatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRANSPORT_SEATS':
        return {
          ...state,
          transportSeats: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
      case 'SET_TRANSPORT_SEATS_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'SELECT_TRANSPORT_SEAT':  
        return {
          ...state,
          selectedSeatId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default transportSeatReducer;
  