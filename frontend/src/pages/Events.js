import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } from '../redux/actions/eventAction';
import EventCard from '../components/EventCard';
import '../assets/styles/Events.scss';
import axios from 'axios';
import Grid from '@mui/material/Grid'; 
import Cookies from 'js-cookie';

const Events = () => {
    const dispatch = useDispatch();
    const { loading, events, error } = useSelector((state) => state.events); 
    const selectedCity = useSelector((state) => state.events.selectedCity); 

    console.log("Selected City:", selectedCity); 

    useEffect(() => {
        const fetchEventsByCity = async (city) => {
            const token = Cookies.get('jwtToken');
            dispatch(fetchEventsRequest());
            try {
                const response = await axios.get(`https://localhost:8443/events/get-events/${city}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                console.log(response.data); 
                dispatch(fetchEventsSuccess(response.data)); 
            } catch (error) {
                console.error("Error fetching events:", error); 
                dispatch(fetchEventsFailure(error.message));
            }
        };

        if (selectedCity) { 
            fetchEventsByCity(selectedCity); 
        }
    }, [selectedCity, dispatch]);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='event-background'>
            <h1>Events in {selectedCity}</h1>
            <Grid container spacing={2} justifyContent="center"> {/* Use Grid for layout */}
                {events.length > 0 ? (
                    events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.startPoint}> {/* Responsive grid item */}
                            <EventCard event={event} selectedCity={selectedCity} /> 
                        </Grid>
                    ))
                ) : (
                    <p>No events are scheduled currently for {selectedCity}</p>
                )}
            </Grid>
        </div>
    );
};

export default Events;