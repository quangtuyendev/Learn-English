import axios from 'axios';

class axiosService {
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://5e6753ea1937020016fed960.mockapi.io'
        });
        // Add a response interceptor
        axios.interceptors.response.use(res => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return res;
        }, error => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    };

    get(endPoint) {
        return this.instance.get(endPoint);
    };

    post(endPoint, data) {
        return this.instance.post(endPoint, data);
    };
  
    put(endPoint, data) {
        return this.instance.put(endPoint, data);
    };
  
    delete(endPoint) {
        return this.instance.delete(endPoint);
    };

};

export default new axiosService();