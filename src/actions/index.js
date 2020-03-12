import * as types from '../constants/index';
import { getItems, putItem, postItem, deleteItem } from '../api/words';

// Authentication
export const signin = ({ email, isAuthenticated }, callback) => {
    localStorage.setItem('currentUser', JSON.stringify({ email, isAuthenticated }));
    callback();
    return {
        type: types.AUTH_USER,
        payload: {
            email,
            isAuthenticated
        }
    };
};

export const signout = () => {
    localStorage.removeItem('currentUser');
    return {
        type: types.AUTH_USER,
        payload: {}
    };
};

// Handle words
export const fetchItems = callback => async distpatch => {
    try {
        const res = await getItems();
        distpatch({
            type: types.FETCH_ITEMS,
            payload: res.data
        });
        callback();
    } catch (error) {
        distpatch({
            type: types.FETCH_ITEMS_ERROR,
            payload: 'Fetch Error'
        });
    };
};

export const saveItem = (word, callback) => async distpatch => {
    try {
        const res = await postItem(word);
        distpatch({
            type: types.SAVE_ITEM,
            payload: res.data
        });
        callback();
    } catch (error) {
        distpatch({
            type: types.SAVE_ITEM_ERROR,
            payload: 'Save Error'
        });
    };
};


export const editItem = (id, word, callback) => async distpatch => {
    try {
        const res = await putItem(id, word);
        distpatch({
            type: types.SAVE_ITEM,
            payload: res.data
        });
        callback();
    } catch (error) {
        distpatch({
            type: types.SAVE_ITEM_ERROR,
            payload: 'Save Error'
        });
    };
};


export const removeItem = (id, callback) => async dispatch => {
    try {
        await deleteItem(id);
        dispatch({
            type: types.DELETE_ITEM,
            payload: id
        });
        callback();
    } catch (error) {
        dispatch({
            type: types.DELETE_ITEM_ERROR,
            payload: 'Delete error'
        });
    };
};

// Handle fetch item to edit
export const fetchItemEdit = value => ({
    type: types.FETCH_ITEM_EDIT,
    payload: value
});

export const clearItemEdit = () => ({
    type: types.CLEAR_ITEM_EDIT
});

// Handle modal
export const showModal = modalContent => {
    return {
        type: types.SHOW_MODAL,
        payload: modalContent
    };
};

export const hideModal = () => ({
    type: types.HIDE_MODAL
});

// Handle Loading
export const showLoading = () => ({
    type: types.SHOW_LOADING
});

export const hideLoading = () => ({
    type: types.HIDE_LOADING
});

// Handle search
export const searchItem = value => ({
    type: types.SEARCH_ITEM,
    payload: value
});

// Handle sort
export const sortItem = ({ sortBy, sortValue }) => ({
    type: types.SORT_ITEM,
    payload: { sortBy, sortValue }
});
