const initialState={
    isLoading: false,
    error: null,
    data:null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                error:null,
                isLoading: true
            };
        case 'USER_FAIL':
            return {
                ...state,
                isLoading:false,
                error:action.payload
            };
        case 'USER_SUCCESS':
            return{
                ...state,
                isLoading:false,
                error:null,
                data:action.payload
            };
        default:
            return state;
    }
};

export default userReducer