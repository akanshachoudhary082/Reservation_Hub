// import emailjs from '@emailjs/browser';
// import {
//   CONTACT_REQUEST,
//   CONTACT_SUCCESS,
//   CONTACT_FAIL,
// } from './contactActionTypes';

// export const sendContactMessage = (formData) => ({
//   type: CONTACT_REQUEST,
//   payload: new Promise(async (resolve, reject) => {
//     try {
//       const result = await emailjs.send(
//         'your_service_id',
//         'your_template_id',
//         {
//           from_name: formData.fullName,
//           from_email: formData.email,
//           mobile_number: `${formData.countryCode}${formData.mobileNumber}`,
//           message: formData.message,
//           issue_type: formData.issueType,
//         },
//         'your_public_key'
//       );
//       resolve(result.text);
//     } catch (error) {
//       reject(error.text || 'Failed to send email');
//     }
//   }),
// });


// src/redux/actions/contactActions.js
// redux/actions/contactActions.js
import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
} from '../actions/contactActionTypes';

export const contactRequest = () => ({
  type: CONTACT_REQUEST,
});

export const contactSuccess = (data) => ({
  type: CONTACT_SUCCESS,
  payload: data,
});

export const contactFail = (error) => ({
  type: CONTACT_FAIL,
  payload: error,
});
