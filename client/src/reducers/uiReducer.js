const initialState = {
    errors : [],
    isLoading: false,
    loadingUser: false,
    loadingPost: false
}
export default function(state = initialState, action){
    switch(action.type){
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                errors: [],
            }
        case 'IS_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'IS_NOT_LOADING':
            return {
                ...state,
                isLoading: false
            }
        case 'LOADING_USER':
            return {
                ...state,
                loadingUser: true
            }
        case 'LOADING_USER_DONE':
            return {
                ...state,
                loadingUser: false
            }
        case 'LOADING_POSTS':
            return {
                ...state,
                loadingPost: true
            }
        case 'FINISH_LOADING_POSTS':
            return {
                ...state,
                loadingPost: false
            }
        default: 
            return state
    }
}