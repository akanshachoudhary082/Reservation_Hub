import { TOGGLE_DRAWER, OPEN_PROFILE_MENU, CLOSE_PROFILE_MENU } from '../actions/navbarActions';

const initialState = {
    openDrawer: false,
    profileMenuAnchorEl: null,
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return { ...state, openDrawer: !state.openDrawer };
        case OPEN_PROFILE_MENU:
            return { ...state, profileMenuAnchorEl: action.payload };
        case CLOSE_PROFILE_MENU:
            return { ...state, profileMenuAnchorEl: null };
        default:
            return state;
    }
};

export default navbarReducer;
