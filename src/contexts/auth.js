import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import * as types from '../actions/types';

export const AuthContext = React.createContext();

const INITIAL_STATE = JSON.parse(localStorage.getItem('currentUser')) || {
  email: '',
  isAuthenticated: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      const {
        payload: { email, isAuthenticated },
      } = action;
      return { ...state, email, isAuthenticated };
    case types.SIGN_OUT:
      localStorage.removeItem('currentUser');
      return { email: '', isAuthenticated: false };
    default:
      throw new Error('Unexpected action');
  }
};
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default function AuthProvider({ children }) {
  const value = useReducer(reducer, INITIAL_STATE);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
