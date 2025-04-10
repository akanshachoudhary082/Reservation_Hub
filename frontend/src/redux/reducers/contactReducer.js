// import {
//   CONTACT_REQUEST,
//   CONTACT_SUCCESS,
//   CONTACT_FAIL,
// } from '../actions/contactActionTypes';

// const initialState = {
//   loading: false,
//   success: false,
//   error: null,
// };

// const contactReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CONTACT_REQUEST:
//       return { ...state, loading: true, error: null, success: false };
//     case CONTACT_SUCCESS:
//       return { ...state, loading: false, success: true };
//     case CONTACT_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default contactReducer;


// src/redux/reducers/contactReducer.js
// redux/reducers/contactReducer.js
import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
} from '../actions/contactActionTypes';

const initialState = {
  loading: false,
  success: false,
  error: null,
  submissions: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        submissions: [...state.submissions, action.payload],
      };
    case CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
