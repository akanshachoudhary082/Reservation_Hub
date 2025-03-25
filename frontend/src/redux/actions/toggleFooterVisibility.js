import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleFooterVisibility } from '../redux/actions/footerActions';

const ToggleFooterButton = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleFooterVisibility()); // Toggle footer visibility
  };

  return (
    <Button onClick={handleToggle} variant="contained" color="primary">
      Toggle Footer
    </Button>
  );
};

export default ToggleFooterButton;
