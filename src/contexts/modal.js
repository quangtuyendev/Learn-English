import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import * as types from '../actions/types';

export const ModalContext = React.createContext();

const INITIAL_STATE = { isOpen: false, component: null };
const reducer = (state, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      const { payload: component } = action;
      return { ...state, ...{ isOpen: true, component } };
    case types.HIDE_MODAL:
      return INITIAL_STATE;
    default:
      throw new Error('Unexpected acions');
  }
};

ModalProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default function ModalProvider({ children }) {
  const value = useReducer(reducer, INITIAL_STATE);
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
