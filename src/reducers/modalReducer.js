import * as types from '../constants/index';

const INITIAL_STATE = {
    isShow: false,
    modalContent: null
};

export const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SHOW_MODAL:
            const { payload: modalContent } = action;
            return {
                ...state,
                isShow: true,
                modalContent
            };
        case types.HIDE_MODAL:
            return {
                ...state,
                isShow: false,
                modalContent: null
            };
        default:
            return state;
    };
};
