import { createStore, combineReducers } from 'redux';
import navbarReducer from './reducers/navbarReducer'; 
import footerReducer from './reducers/footerReducer';
import transportReducer from './reducers/transportReducer';
import movieReducer from './reducers/movieReducer';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
    navbar: navbarReducer, 
    footer: footerReducer, 
    transport: transportReducer,
    login: loginReducer,
    movie: movieReducer,
});

const store = createStore(rootReducer);

export default store;
