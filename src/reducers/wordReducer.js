import _ from 'lodash';
import * as types from '../constants/index';

// find index
const resultIndex = (arr, id) => {
    return _.findIndex(arr, { id });
};

const INITIAL_STATE = [];
export const wordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_ITEMS:
            return [...action.payload];
        case types.SAVE_ITEM:
            const { id: idSave } = action.payload;
            const indexSave = resultIndex(state, idSave);
            if (indexSave === -1) {
                state = [...state, action.payload];
            } else {
                state[indexSave] = { ...action.payload };
            }
            return [...state];
        case types.DELETE_ITEM:
            const { payload: idDelete } = action;
            const indexDelete = resultIndex(state, idDelete);
            state.splice(indexDelete, 1);
            return [...state];
        default:
            return state;
    };
};