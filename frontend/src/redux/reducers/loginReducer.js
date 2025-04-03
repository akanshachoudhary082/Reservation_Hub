import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginAction';

const initialState = {
    loading: false,
    user: null,
    error: null,
    otpSent: false, 
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null, otpSent: false }; 
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, otpSent: true }; 
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default loginReducer;