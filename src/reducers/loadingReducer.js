import * as types from '../constants/index';

const INITIAL_STATE = false;

export const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SHOW_LOADING:
            return true;
        case types.HIDE_LOADING:
            return false;
        default:
            return state;
    };
};
