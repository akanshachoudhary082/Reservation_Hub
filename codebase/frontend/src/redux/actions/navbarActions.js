export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const OPEN_PROFILE_MENU = "OPEN_PROFILE_MENU";
export const CLOSE_PROFILE_MENU = "CLOSE_PROFILE_MENU";

export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER,
})

export const openProfileMenu = (anchorEl) => ({
    type: OPEN_PROFILE_MENU,
    payload: anchorEl,
})

export const closeProfileMenu = () =>({
    type: CLOSE_PROFILE_MENU,
})