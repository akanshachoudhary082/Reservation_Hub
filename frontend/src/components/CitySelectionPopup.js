// src/components/CitySelectionPopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import '../assets/styles/CityPopup.scss';

const CitySelectionPopup = ({ open, onClose, onSelectCity }) => {
    const cities = ['Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Delhi', 'Chennai', 'Kolkata', 'Ahmedabad','Chandigarh','Gandhinagar']; // Example cities

    return (
        <Dialog open={open} onClose={onClose} className='popup'>
            <DialogTitle className='popup-title'>Select your City</DialogTitle>
            <DialogContent className='popup-content'>
                <Typography variant="body1" className='popup-description'>
                </Typography>
                <div className='city-buttons'>
                    {cities.map((city) => (
                        <Button
                            key={city}
                            onClick={() => {
                                onSelectCity(city);
                                onClose();
                            }}
                            className='city-button'
                        >
                            {city}
                        </Button>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" className='cancel-button'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CitySelectionPopup;