const initialState = {
    isFooterVisible: true,
};

const footerReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'TOGGLE_FOOTER_VISIBILITY':
            return {
                ...state,
                isFooterVisible: action.payload,
            };

            default:
                return state;
    }
};

export default footerReducer;
