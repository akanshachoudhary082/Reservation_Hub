// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import emailjs from '@emailjs/browser';
// import { Autocomplete } from '@mui/material';
// import {
//     Box, TextField, Button, MenuItem, Typography, Paper, Grid
// } from '@mui/material';

// import rawCountryCodes from '../assets/countryPhoneCodes.json';
// import {
//     CONTACT_REQUEST,
//     CONTACT_SUCCESS,
//     CONTACT_FAIL
// } from '../redux/actions/contactActionTypes';


// const countryCodes = Object.entries(rawCountryCodes).map(([code, dial]) => ({
//     code,
//     dial_code: dial.startsWith('+') ? dial : `+${dial}`
// }));

// const categories = ['Transport', 'Movies', 'Events', 'Other'];

// const ContactUs = () => {
//     const dispatch = useDispatch();
//     const { loading, error, success } = useSelector(state => state.contact);

//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         countryCode: '+91',
//         mobile: '',
//         category: 'Transport',
//         message: ''
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const validate = () => {
//         const newErrors = {};
//         if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Enter a valid email address';
//         }

//         if (!formData.mobile.trim()) {
//             newErrors.mobile = 'Mobile number is required';
//         } else if (!/^\d{6,15}$/.test(formData.mobile)) {
//             newErrors.mobile = 'Enter a valid mobile number (6–15 digits)';
//         }

//         if (!formData.message.trim()) newErrors.message = 'Message is required';

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         const fullMobile = `${formData.countryCode}${formData.mobile}`;

//         const payload = {
//             full_name: formData.fullName,
//             email: formData.email,
//             mobile: fullMobile,
//             category: formData.category,
//             message: formData.message,
//         };

//         try {
//             dispatch({ type: CONTACT_REQUEST });
            

//             await emailjs.send(
//                 'service_b8at0tz',
//                 'template_dhhfub9',
//                 payload,
//                 'JZnsSgzLTKv81Xj7W'
//             );

//             dispatch({ type: CONTACT_SUCCESS });
//             alert('Your message has been sent!');
//             setFormData({
//                 fullName: '',
//                 email: '',
//                 countryCode: '+91',
//                 mobile: '',
//                 category: 'Transport',
//                 message: ''
//             });
//             setErrors({});
//         } catch (err) {
//             dispatch({ type: CONTACT_FAIL, payload: 'Failed to send. Please try again.' });
//         }
//     };

//     return (
//         <Paper elevation={4} sx={{ padding: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
//             <Typography variant="h5" gutterBottom>
//                 How can we help you?
//             </Typography>
//             <form onSubmit={handleSubmit} noValidate>
//                 <TextField
//                     label="Full Name"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     error={!!errors.fullName}
//                     helperText={errors.fullName}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     error={!!errors.email}
//                     helperText={errors.email}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />

//                 <Grid container spacing={2}>
//                     <Grid item xs={4}>
//                         <Autocomplete
//                             options={countryCodes}
//                             getOptionLabel={(option) => `${option.code} (${option.dial_code})`}
//                             value={countryCodes.find((item) => item.dial_code === formData.countryCode) || null}
//                             onChange={(e, newValue) => {
//                                 if (newValue) {
//                                     setFormData({ ...formData, countryCode: newValue.dial_code });
//                                 }
//                             }}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Code" fullWidth required />
//                             )}
//                         />
//                     </Grid>
//                     <Grid item xs={8}>
//                         <TextField
//                             label="Mobile Number"
//                             name="mobile"
//                             value={formData.mobile}
//                             onChange={(e) => {
//                                 const val = e.target.value;
//                                 if (/^\d*$/.test(val)) {
//                                     setFormData({ ...formData, mobile: val });
//                                 }
//                             }}
//                             error={!!errors.mobile}
//                             helperText={errors.mobile}
//                             fullWidth
//                             required
//                         />
//                     </Grid>
//                 </Grid>

//                 <TextField
//                     select
//                     label="Category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 >
//                     {categories.map((option) => (
//                         <MenuItem key={option} value={option}>
//                             {option}
//                         </MenuItem>
//                     ))}
//                 </TextField>

//                 <TextField
//                     label="Briefly describe your issue"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     error={!!errors.message}
//                     helperText={errors.message}
//                     fullWidth
//                     margin="normal"
//                     multiline
//                     rows={4}
//                     required
//                 />

//                 <Box mt={2}>
//                     <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
//                         {loading ? 'Submitting...' : 'Submit'}
//                     </Button>
//                     {error && <Typography color="error" mt={1}>{error}</Typography>}
//                     {success && <Typography color="success.main" mt={1}>Submitted successfully!</Typography>}
//                 </Box>
//             </form>
//         </Paper>
//     );
// };

// export default ContactUs;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, MenuItem, Typography, Paper, Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';
import axios from 'axios'; // Axios to call backend API
import rawCountryCodes from '../assets/countryPhoneCodes.json';
import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
} from '../redux/actions/contactActionTypes';

const countryCodes = Object.entries(rawCountryCodes).map(([code, dial]) => ({
  code,
  dial_code: dial.startsWith('+') ? dial : `+${dial}`,
}));

const categories = ['Transport', 'Movies', 'Events', 'Other'];

const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    category: 'Transport',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{6,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid mobile number (6–15 digits)';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    if (!validate()) return;

    const fullMobile = `${formData.countryCode}${formData.mobile}`;

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      mobile: fullMobile,
      category: formData.category,
      message: formData.message,
    };

    try {
      dispatch({ type: CONTACT_REQUEST });

      // Make a POST request to the backend API to send the email
      const response = await axios.post('/contact', payload);

      // If successful, dispatch success action and reset form
      dispatch({ type: CONTACT_SUCCESS });
      alert('Your message has been sent!');
      setFormData({
        fullName: '',
        email: '',
        countryCode: '+91',
        mobile: '',
        category: 'Transport',
        message: '',
      });
      setErrors({});
    } catch (err) {
      // Handle error and display message
      dispatch({ type: CONTACT_FAIL, payload: 'Failed to send. Please try again.' });
    }
  };

  return (
    <Paper elevation={4} sx={{ padding: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        How can we help you?
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          required
        />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Autocomplete
              options={countryCodes}
              getOptionLabel={(option) => `${option.code} (${option.dial_code})`}
              value={countryCodes.find((item) => item.dial_code === formData.countryCode) || null}
              onChange={(e, newValue) => {
                if (newValue) {
                  setFormData({ ...formData, countryCode: newValue.dial_code });
                }
              }}
              renderInput={(params) => <TextField {...params} label="Code" fullWidth required />}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setFormData({ ...formData, mobile: val });
                }
              }}
              error={!!errors.mobile}
              helperText={errors.mobile}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <TextField
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Briefly describe your issue"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={errors.message}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          {error && <Typography color="error" mt={1}>{error}</Typography>}
          {success && <Typography color="success.main" mt={1}>Submitted successfully!</Typography>}
        </Box>
      </form>
    </Paper>
  );
};

export default ContactUs;

