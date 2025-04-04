import { SET_TRANSPORT_DATA, SET_LOADING, SET_ERROR } from '../actions/transportActionType';

const initialState = {
  services: [],   
  loading: false, 
  error: null,    
};

const transportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSPORT_DATA:
      return {
        ...state,
        services: action.payload,  
        loading: false,            
        error: null,               
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true, 
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };

    default:
      return state;
  }
};

export default transportReducer;
