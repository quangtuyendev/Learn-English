import * as types from '../constants/index';

const INITIAL_STATE = {};

export const editReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_ITEM_EDIT:
            return {
                ...state,
                ...action.payload
            };
        case types.CLEAR_ITEM_EDIT:
            return {};
        default:
            return state;
    };
};