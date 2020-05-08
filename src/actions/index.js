import * as types from './types';

export const fetchUserRequest = (users) => ({
  type: types.FETCH_USERS,
  payload: users,
});

export const signOut = () => ({
  type: types.SIGN_OUT,
});

export const signIn = (userInfo, callback) => {
  callback();
  return {
    type: types.AUTH_USER,
    payload: userInfo,
  };
};

export const signUp = (userInfo) => ({
  type: types.SIGN_UP,
  payload: userInfo,
});

export const fetchItemEdit = (item) => ({
  type: types.FETCH_ITEM_EDIT,
  payload: item,
});

export const clearItemEdit = () => ({
  type: types.CLEAR_ITEM_EDIT,
});

export const fetchWordsRequest = (items) => ({
  type: types.FETCH_ITEMS,
  payload: items,
});

export const saveItem = (item, callback) => {
  callback();
  return { type: types.SAVE_ITEM, payload: item };
};

export const deleteItem = (id, callback) => {
  callback();
  return {
    type: types.DELETE_ITEM,
    payload: id,
  };
};

export const showLoading = () => ({
  type: types.SHOW_LOADING,
});
export const hideLoading = () => ({
  type: types.HIDE_LOADING,
});

export const showModal = (component) => ({
  type: types.SHOW_MODAL,
  payload: component,
});
export const hideModal = () => ({
  type: types.HIDE_MODAL,
});

/* 

export const addItem = (item, callback) => async dispatch => {
  try {
    const { data } = await postItem(item);
    callback();
    dispatch({ type: types.SAVE_ITEM, payload: data });
  } catch (error) {
    console.log('Add item faild');
  }
};


export const editItem = async (id, item, callback) => {
  try {
    await putItem(id, item);
    callback();
    return {
      type: types.SAVE_ITEM,
      payload: item,
    };
  } catch (error) {
    console.log('Edit item faild');
  }
};

export const deleteItem = async (id, callback) => {
  try {
    await deleteItemRequest(id);
    callback();
    return {
      type: types.DELETE_ITEM,
      payload: id,
    };
  } catch (error) {
    console.log('Delete item faild');
  }
};
*/
