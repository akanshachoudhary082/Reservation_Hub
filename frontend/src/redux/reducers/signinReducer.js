import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../actions/signinAction';

const initialState = {
    loading: false,
    user: null,
    error: null,
    otpSent: false, // New state to track if OTP has been sent
};

const signinReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return { ...state, loading: true, error: null, otpSent: false }; // Reset otpSent on request
        case SIGNIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, otpSent: true }; // Set otpSent to true on success
        case SIGNIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default signinReducer;