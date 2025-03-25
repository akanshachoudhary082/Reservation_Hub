export const toggleFooterVisibility = (isVisible) =>{
    return {
        type: 'TOGGLE_FOOTER_VISIBILITY',
        payload: isVisible,
    };
};