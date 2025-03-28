import axios from 'axios';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const signinUser  = (mobileNumber) => async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST });
    try {
        // Make sure the URL matches your Spring Boot endpoint
        const response = await axios.post('/api/send-otp', { mobileNumber });

        // Dispatch success action with the response data
        dispatch({ type: SIGNIN_SUCCESS, payload: response.data });

        // Return success and data for further handling if needed
        return { success: true, data: response.data };
    } catch (error) {
        // Handle error response
        const errorMessage = error.response?.data || 'Failed to send OTP. Please try again.'; // Fallback error message
        dispatch({ type: SIGNIN_FAILURE, payload: errorMessage });

        // Rethrow error with a message for handling in the component
        throw new Error(errorMessage);
    }
};