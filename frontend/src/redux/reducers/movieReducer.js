import { SET_MOVIES_REQUEST, SET_MOVIES_SUCCESS, SET_MOVIES_FAILURE } from '../actions/movieAction';

const initialState = {
    loading: false,
    movies: [],
    error: '',
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES_REQUEST:
            return { ...state, loading: true, error: null };
        case SET_MOVIES_SUCCESS:
            return { ...state, loading: false, movies: action.payload};
        case SET_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default movieReducer;