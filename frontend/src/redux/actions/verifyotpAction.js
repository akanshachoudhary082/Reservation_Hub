import { VERIFY_OTP } from '../actions/otpActionTypes'; 

export const verifyotpAction = (otp) => async (dispatch) => {
    
    const response = await fetch('/verify-otp', {
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