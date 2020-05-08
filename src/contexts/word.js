import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useReducer } from 'react';
import * as types from '../actions/types';
import { resultIndex } from '../utils/index';

export const WordContext = React.createContext();

const INITIAL_STATE = [];
const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      return [...action.payload];
    case types.SAVE_ITEM:
      let newState = [];
      const { id: idSave } = action.payload;
      const indexSave = resultIndex(state, idSave);
      if (indexSave === -1) {
        newState = [...state, action.payload];
      } else {
        newState = Object.assign([...state], { [indexSave]: action.payload });
      }
      return [...newState];
    case types.DELETE_ITEM:
      const { payload: idDelete } = action;
      return [..._.filter(state, ({ id }) => id !== idDelete)];
    default:
      throw new Error('Unexpected action');
  }
};

WordProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default function WordProvider({ children }) {
  const value = useReducer(reducer, INITIAL_STATE);
  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
}
