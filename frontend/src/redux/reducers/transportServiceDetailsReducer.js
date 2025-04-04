import { SET_SERVICE_DETAILS, SET_LOADING, SET_ERROR } from '../actions/transportServiceDetailActionType';

const initialState = {
  serviceDetails: [],  
  loading: false,
  error: null,
};

const transportServiceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_SERVICE_DETAILS:
      return { ...state, serviceDetails: action.payload, loading: false };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default transportServiceDetailsReducer;
