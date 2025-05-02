import { createStore, combineReducers } from 'redux';
import navbarReducer from './reducers/navbarReducer'; 
import footerReducer from './reducers/footerReducer';
import transportReducer from './reducers/transportReducer';
import moviesReducer from './reducers/movieReducer';
import loginReducer from './reducers/loginReducer';
import transportServiceDetailsReducer from './reducers/transportServiceDetailsReducer';
import userReducer from './reducers/userReducer';
import contactReducer from './reducers/contactReducer';
import transportSeatReducer from './reducers/transportSeatReducer';
import transportBookingReducer from './reducers/transportBookingReducer';
import transportPaymentReducer from './reducers/transportPaymentReducer';
import eventReducer from './reducers/eventReducer';

const rootReducer = combineReducers({
    navbar: navbarReducer, 
    footer: footerReducer, 
    transport: transportReducer,
    transportServiceDetails: transportServiceDetailsReducer,
    login: loginReducer,
    movies: moviesReducer,
    contact: contactReducer,
    transportSeats: transportSeatReducer,
    transportBooking: transportBookingReducer,
    transportPayment: transportPaymentReducer,
    user: userReducer, // handles registration and profile update
    events: eventReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  )

export default store;


