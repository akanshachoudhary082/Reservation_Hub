import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginUser  = (mobileNumber) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        // Make sure the URL matches your Spring Boot endpoint
        const response = await axios.post('http://localhost:3002/api/send-otp', { mobileNumber });

        // Dispatch success action with the response data
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });

        // Return success and data for further handling if needed
        return { success: true, data: response.data };
    } catch (error) {
        // Handle error response
        const errorMessage = error.response?.data || 'Failed to send OTP. Please try again.'; // Fallback error message
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });

        // Rethrow error with a message for handling in the component
        throw new Error(errorMessage);
    }
};