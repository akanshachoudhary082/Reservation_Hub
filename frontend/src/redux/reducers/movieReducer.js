import { SET_MOVIES_REQUEST, SET_MOVIES_SUCCESS, SET_MOVIES_FAILURE } from '../actions/movieAction';

const initialState = {
    loading: false,
    movies: [],
    error: '',
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES_REQUEST:
            return { ...state, loading: true };
        case SET_MOVIES_SUCCESS:
            return { loading: false, movies: action.payload, error: '' };
        case SET_MOVIES_FAILURE:
            return { loading: false, movies: [], error: action.payload };
        default:
            return state;
    }
};

export default movieReducer;