import * as types from '../constants/index';

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
const { email, isAuthenticated } = currentUser;

const INITIAL_STATE = {
    email,
    isAuthenticated
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.AUTH_USER:
            const { email, isAuthenticated } = action.payload;
            return { ...state, email, isAuthenticated };
        default:
            return state;
    };
};

