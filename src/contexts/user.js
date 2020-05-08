import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import * as types from '../actions/types';

export const UserContext = React.createContext();

const INITIAL_STATE = [];
export const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_USERS:
      return [...action.payload];
    case types.SIGN_UP:
      const { payload } = action;
      return [...state, payload];
    default:
      throw new Error('Unexpected action');
  }
};

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default function UserProvider({ children }) {
  const value = useReducer(reducer, INITIAL_STATE);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
