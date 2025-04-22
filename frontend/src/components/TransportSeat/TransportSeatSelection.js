import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import { setTransportSeats, setLoading, setTransportSeatsError } from '../../redux/actions/transportSeatActions';

import BusSeatSelection from './BusSeatSelection';
import TrainSeatSelection from './TrainSeatSelection';
import FlightSeatSelection from './FlightSeatSelection';

const TransportSeatSelection = () => {
  const { transport } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, transportSeats: seats, error } = useSelector((state) => state.transportSeats);

  const serviceDetailId = new URLSearchParams(location.search).get('serviceDetailId');

  useEffect(() => {
    // Check if serviceDetailId is available, otherwise show an error
    if (!serviceDetailId) {
      dispatch(setTransportSeatsError('Service ID is missing.'));
      return;
    }

    const fetchSeats = async () => {
      dispatch(setLoading(true));
      try {
        // Fetch available seats from the backend
        const response = await axios.get(`/seats/available/${serviceDetailId}`); // HTTPS URL

        // Store the fetched seats in the Redux store
        dispatch(setTransportSeats(response.data));

        // Store transport and seat selection in cookies with the secure flag (for HTTPS)
        Cookies.set('selectedTransport', transport, { secure: true, sameSite: 'Strict' });  // Store transport type securely
        Cookies.set('selectedSeats', JSON.stringify(response.data), { secure: true, sameSite: 'Strict' });  // Store seats data securely

      } catch (err) {
        // Dispatch error action if the request fails
        dispatch(setTransportSeatsError('Failed to load seats.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    // Call the function to fetch seats on component mount
    fetchSeats();
  }, [serviceDetailId, dispatch, transport]); // Re-run when serviceDetailId or transport changes

  const renderSeatComponent = () => {
    switch (transport.toUpperCase()) {
      case 'BUS':
        return <BusSeatSelection seats={seats} />;
      case 'TRAIN':
        return <TrainSeatSelection seats={seats} />;
      case 'FLIGHT':
        return <FlightSeatSelection seats={seats} />;
      default:
        return <div>No seat layout available for this transport type</div>;
    }
  };

  // Handle loading and error states
  if (loading) return <div>Loading seats...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Select Your Seat</h2>
      {renderSeatComponent()}
    </div>
  );
};

export default TransportSeatSelection;
