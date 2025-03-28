import { createStore, combineReducers } from 'redux';
import navbarReducer from './reducers/navbarReducer'; // Import the navbarReducer
import footerReducer from './reducers/footerReducer';
import signinReducer from './reducers/signinReducer';

const rootReducer = combineReducers({
    navbar: navbarReducer, // Add navbarReducer to your combined reducers
    footer: footerReducer, //Add footerReducer to your combined reducers
    signin: signinReducer,
});

const store = createStore(rootReducer);

export default store;
