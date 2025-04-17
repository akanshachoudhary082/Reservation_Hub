import React from 'react';
import { useLocation } from 'react-router-dom';

const Events = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city'); 

    return (
        <div>
            <h1>Events in {city}</h1>
        
        </div>
    );
};

export default Events;