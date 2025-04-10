// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   MenuItem,
//   TextField,
//   Typography,
//   Autocomplete,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import emailjs from '@emailjs/browser';
// import countryPhoneCodesRaw from '../assets/countryPhoneCodes.json';
// import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAIL } from '../redux/actions/contactActionTypes';

// const countryPhoneCodes = Object.entries(countryPhoneCodesRaw).map(([code, dial]) => ({
//   code,
//   dial_code: dial.startsWith('+') ? dial : `+${dial}`,
// }));

// const categories = ['Movies', 'Events', 'Dining', 'Other'];

// const ContactUs = () => {
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.contact);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     countryCode: '+91',
//     mobile: '',
//     issue: '',
//     category: '',
//   });

//   const [mobileError, setMobileError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === 'mobile') setMobileError('');
//   };

//   const validateMobile = () => {
//     const isValid = /^\d{7,15}$/.test(formData.mobile);
//     if (!isValid) {
//       setMobileError('Enter a valid mobile number (7–15 digits)');
//     }
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateMobile()) return;

//     try {
//       dispatch({ type: CONTACT_REQUEST });

//       const templateParams = {
//         full_name: formData.fullName,
//         email: formData.email,
//         mobile: `${formData.countryCode}${formData.mobile}`,
//         category: formData.category,
//         message: formData.issue,
//       };

//       await emailjs.send(
//         'your_service_id',
//         'your_template_id',
//         templateParams,
//         'your_user_id'
//       );

//       dispatch({ type: CONTACT_SUCCESS });
//       alert('Issue submitted successfully!');
//       setFormData({
//         fullName: '',
//         email: '',
//         countryCode: '+91',
//         mobile: '',
//         issue: '',
//         category: '',
//       });
//     } catch (err) {
//       dispatch({ type: CONTACT_FAIL, payload: 'Failed to send email' });
//     }
//   };

//   return (
//     <Box maxWidth={600} mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>How can we help you?</Typography>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <TextField
//           label="Full name"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           label="Email address"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <Autocomplete
//           options={countryPhoneCodes}
//           getOptionLabel={(option) => `${option.dial_code} (${option.code})`}
//           isOptionEqualToValue={(option, value) => option.dial_code === value.dial_code}
//           value={countryPhoneCodes.find(c => c.dial_code === formData.countryCode) || null}
//           onChange={(e, newValue) => {
//             setFormData(prev => ({ ...prev, countryCode: newValue?.dial_code || '' }));
//           }}
//           renderInput={(params) => <TextField {...params} label="Country Code" required />}
//           sx={{ width: '50%' }}
//         />

//         <TextField
//           label="Mobile number"
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           required
//           error={!!mobileError}
//           helperText={mobileError}
//         />

//         <TextField
//           select
//           label="Category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         >
//           {categories.map((cat) => (
//             <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           label="Briefly describe your issue"
//           name="issue"
//           multiline
//           rows={4}
//           value={formData.issue}
//           onChange={handleChange}
//           required
//         />

//         <Button type="submit" variant="contained" disabled={loading}>
//           {loading ? 'Sending...' : 'Submit'}
//         </Button>
//         {error && <Typography color="error">{error}</Typography>}
//         {success && <Typography color="success.main">Submitted successfully!</Typography>}
//       </form>
//     </Box>
//   );
// };

// export default ContactUs;


// src/components/ContactForm.js

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { sendContactEmail } from '../redux/actions/contactActions';
// import {
//     Box,
//     TextField,
//     Button,
//     MenuItem,
//     Typography,
//     Paper
// } from '@mui/material';

// const categories = ['Transport', 'Movies', 'Events', 'Other'];

// const ContactForm = () => {
//     const dispatch = useDispatch();

//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
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
//         if (!formData.email.trim()) newErrors.email = 'Email is required';
//         if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
//         if (!formData.message.trim()) newErrors.message = 'Message is required';

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validate()) return;
//         dispatch(sendContactEmail(formData));
//         setFormData({
//             fullName: '',
//             email: '',
//             mobile: '',
//             category: 'Transport',
//             message: ''
//         });
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
//                 <TextField
//                     label="Mobile Number"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     error={!!errors.mobile}
//                     helperText={errors.mobile}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
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
//                     <Button type="submit" variant="contained" color="primary" fullWidth>
//                         Submit
//                     </Button>
//                 </Box>
//             </form>
//         </Paper>
//     );
// };

// export default ContactForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import { Autocomplete } from '@mui/material';
import {
    Box, TextField, Button, MenuItem, Typography, Paper, Grid
} from '@mui/material';

import rawCountryCodes from '../assets/countryPhoneCodes.json';
import {
    CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_FAIL
} from '../redux/actions/contactActionTypes';


const countryCodes = Object.entries(rawCountryCodes).map(([code, dial]) => ({
    code,
    dial_code: dial.startsWith('+') ? dial : `+${dial}`
}));

const categories = ['Transport', 'Movies', 'Events', 'Other'];

const ContactUs = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.contact);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        countryCode: '+91',
        mobile: '',
        category: 'Transport',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
            

            await emailjs.send(
                'your_service_id',
                'your_template_id',
                payload,
                'your_public_key'
            );

            dispatch({ type: CONTACT_SUCCESS });
            alert('Your message has been sent!');
            setFormData({
                fullName: '',
                email: '',
                countryCode: '+91',
                mobile: '',
                category: 'Transport',
                message: ''
            });
            setErrors({});
        } catch (err) {
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
                            renderInput={(params) => (
                                <TextField {...params} label="Code" fullWidth required />
                            )}
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
