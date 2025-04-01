import { createStore, combineReducers } from 'redux';
import navbarReducer from './reducers/navbarReducer'; 
import footerReducer from './reducers/footerReducer';
import transportReducer from './reducers/transportReducer';


const rootReducer = combineReducers({
    navbar: navbarReducer, 
    footer: footerReducer, 
    transport: transportReducer,
});

const store = createStore(rootReducer);

export default store;
