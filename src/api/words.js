import axios from '../utils/axiosService';

import { URL } from '../constants/index';
const END_POINT = 'words';

// Fetch items
export const getItems = () => axios.get(`${URL}/${END_POINT}`);

// Post a new item
export const postItem = word => axios.post(`${URL}/${END_POINT}`, word);

// Update item
export const putItem = (id, word) => axios.put(`${URL}/${END_POINT}/${id}`, word);

// Detete a item
export const deleteItem = id => axios.delete(`${URL}/${END_POINT}/${id}`);