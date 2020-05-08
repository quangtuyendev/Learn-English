import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import * as types from '../actions/types';

export const EditItemContext = React.createContext();

const INITIAL_STATE = { name: '', image: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_ITEM_EDIT:
      return { ...state, ...action.payload };
    case types.CLEAR_ITEM_EDIT:
      return INITIAL_STATE;
    default:
      throw new Error('Unexpected acions');
  }
};
EditItemProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default function EditItemProvider({ children }) {
  const value = useReducer(reducer, INITIAL_STATE);
  return (
    <EditItemContext.Provider value={value}>
      {children}
    </EditItemContext.Provider>
  );
}
