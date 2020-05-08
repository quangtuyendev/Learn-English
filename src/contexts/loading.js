import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import * as types from '../actions/types';

export const LoadingContext = React.createContext();

const INITIAL_STATE = false;
const reducer = (state, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return true;
    case types.HIDE_LOADING:
      return false;
    default:
      throw new Error('Unexpected acions');
  }
};
LoadingProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
export default function LoadingProvider({ children }) {
  const value = useReducer(reducer, INITIAL_STATE);
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
