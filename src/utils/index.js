import _ from 'lodash';

export const findUser = (users, email) =>
  _.find(users, (user) => user.email === email) || {};

export const resultIndex = (arr, id) => {
  return _.findIndex(arr, { id });
};
