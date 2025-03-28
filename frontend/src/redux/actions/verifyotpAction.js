import { VERIFY_OTP } from '../actions/actionTypes'; // Define your action types

export const verifyotpAction = (otp) => async (dispatch) => {
    // Replace with your API call to verify OTP
    const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
    });

    if (!response.ok) {
        throw new Error('Failed to verify OTP');
    }

    const data = await response.json();
    dispatch({ type: VERIFY_OTP, payload: data });
};