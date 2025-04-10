import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} from './userActionType';

// User Registration Actions
export const userRegisterRequest = () => ({
  type: USER_REGISTER_REQUEST,
});

export const userRegisterSuccess = (data) => ({
  type: USER_REGISTER_SUCCESS,
  payload: data,
});

export const userRegisterFail = (error) => ({
  type: USER_REGISTER_FAIL,
  payload: error,
});

// User Profile Update Actions
export const userProfileUpdateRequest = () => ({
  type: USER_PROFILE_UPDATE_REQUEST,
});

export const userProfileUpdateSuccess = (data) => ({
  type: USER_PROFILE_UPDATE_SUCCESS,
  payload: data,
});

export const userProfileUpdateFail = (error) => ({
  type: USER_PROFILE_UPDATE_FAIL,
  payload: error,
});
