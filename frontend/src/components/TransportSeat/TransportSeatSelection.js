import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setTransportSeats, setLoading, setTransportSeatsError } from '../../redux/actions/transportSeatActions';

import BusSeatSelection from './BusSeatSelection';
import TrainSeatSelection from './TrainSeatSelection';
import FlightSeatSelection from './FlightSeatSelection';

const TransportSeatSelection = ({ transport, adminId }) => {
  const dispatch = useDispatch();
  const { loading, transportSeats: seats, error } = useSelector((state) => state.transportSeats);

  useEffect(() => {
    if (!adminId) {
      dispatch(setTransportSeatsError('Admin ID is missing.'));
      return;
    }

    const fetchSeats = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`/seats/admin/${adminId}`);
        dispatch(setTransportSeats(response.data));

        Cookies.set('selectedTransport', transport, { secure: true, sameSite: 'Strict' });
        Cookies.set('selectedSeats', JSON.stringify(response.data), { secure: true, sameSite: 'Strict' });

      } catch (err) {
        dispatch(setTransportSeatsError('Failed to load seats.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSeats();
  }, [adminId, dispatch, transport]);

  const renderSeatComponent = () => {
    switch ((transport || '').toUpperCase()) {
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
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Select Your Seat</h2>
      {renderSeatComponent()}
    </div>
  );
};

export default TransportSeatSelection;
