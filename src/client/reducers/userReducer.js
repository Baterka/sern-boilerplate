import { GET_USERNAME, SHOW_ERROR, USERNAME_RECEIVED } from '../actions/types';

const initialState = {
    username: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERNAME:
            return {
                ...state,
                loading: true,
            };
        case USERNAME_RECEIVED:
            return {
                ...state,
                loading: false,
                username: action.payload.username
            };
        case SHOW_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
