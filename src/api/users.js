import axios from '../utils/axiosService';

const END_POINT = 'users';

export const getUsers = () => axios.get(`/${END_POINT}`);
export const postUser = (userInfo) => axios.post(`/${END_POINT}`, userInfo);
