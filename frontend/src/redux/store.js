import { createStore, combineReducers } from 'redux';
import navbarReducer from './reducers/navbarReducer'; 
import footerReducer from './reducers/footerReducer';
import transportReducer from './reducers/transportReducer';
import moviesReducer from './reducers/movieReducer';
import loginReducer from './reducers/loginReducer';
import transportServiceDetailsReducer from './reducers/transportServiceDetailsReducer';

const rootReducer = combineReducers({
    navbar: navbarReducer, 
    footer: footerReducer, 
    transport: transportReducer,
    transportServiceDetails: transportServiceDetailsReducer,
    login: loginReducer,
    movies: moviesReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enables Redux DevTools
  )

export default store;


