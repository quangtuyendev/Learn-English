import * as types from '../constants/index';

const INITIAL_STATE = '';

export const searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SEARCH_ITEM:
            return action.payload;
        default:
            return state;
    };
};