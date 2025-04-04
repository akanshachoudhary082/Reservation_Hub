import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginUser  = (fullNumber) => async (dispatch) => {
    
    dispatch({ type: LOGIN_REQUEST });
    try {
        
        const response = await axios.post('http://localhost:3002/send-otp', { fullNumber });
        
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });

        return { success: true, data: response.data };
    } 
    catch (error) {

        const errorMessage = error.response?.data || 'Failed to send OTP. Please try again.'; 
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });

        throw new Error(errorMessage);
    }
};