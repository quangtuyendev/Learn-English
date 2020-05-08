import axios from '../utils/axiosService';

const END_POINT = 'words';

// Fetch items
export const getItems = () => axios.get(`/${END_POINT}`);

// Post a new item
export const postItem = (word) => axios.post(`/${END_POINT}`, word);

// Update item
export const putItem = (id, word) => axios.put(`/${END_POINT}/${id}`, word);

// Detete a item
export const deleteItem = (id) => axios.delete(`/${END_POINT}/${id}`);
