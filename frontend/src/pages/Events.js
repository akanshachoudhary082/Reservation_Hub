import React from 'react';
import { useLocation } from 'react-router-dom';

const Events = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city'); // Get the city from the URL

    return (
        <div>
            <h1>Events in {city}</h1>
            {/* Render movies based on the selected city */}
        </div>
    );
};

export default Events;