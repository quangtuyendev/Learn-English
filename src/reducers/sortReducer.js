import * as types from '../constants/index';

const INITIAL_STATE = {
    sortBy: 'name',
    sortValue: 1
};

export const sortReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SORT_ITEM:
            const { sortBy, sortValue } = action.payload;
            return {
                ...state,
                sortBy,
                sortValue
            };
        default:
            return state;
    };
};