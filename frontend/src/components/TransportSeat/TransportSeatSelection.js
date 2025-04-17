import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom'; 
import axios from 'axios';
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
    if (!serviceDetailId) {
      dispatch(setTransportSeatsError('Service ID is missing.'));
      return;
    }

    const fetchSeats = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`http://localhost:8080/seats/available/${serviceDetailId}`);
        dispatch(setTransportSeats(response.data)); 
      } catch (err) {
        dispatch(setTransportSeatsError('Failed to load seats.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSeats();
  }, [serviceDetailId, dispatch]);

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
