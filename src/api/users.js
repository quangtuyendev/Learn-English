import axios from '../utils/axiosService';

import { URL } from '../constants/index';
const END_POINT = 'users';

export const getUsers = () => axios.get(`${URL}/${END_POINT}`);
export const postUser = userInfo => axios.post(`${URL}/${END_POINT}`, userInfo);