import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { wordReducer } from './wordReducer';
import { modalReducer } from './modalReducer';
import { loadingReducer } from './loadingReducer';
import { editReducer } from './editReducer';
import { searchReducer } from './searchReducer';
import { sortReducer } from './sortReducer';

export default combineReducers({
    auth: authReducer,
    words: wordReducer,
    modal: modalReducer,
    loading: loadingReducer,
    valueEdit: editReducer,
    searchValue: searchReducer,
    sortData: sortReducer
});