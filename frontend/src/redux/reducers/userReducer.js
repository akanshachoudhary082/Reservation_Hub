import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} from '../actions/userActionTypes';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  updateSuccess: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Registration
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        updateSuccess: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Profile Update
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        updateSuccess: false,
      };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload, // update userInfo with latest data
        updateSuccess: true,
        error: null,
      };
    case USER_PROFILE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updateSuccess: false,
      };

    default:
      return state;
  }
};

export default userReducer;
