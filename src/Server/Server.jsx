import axios from 'axios';

const REACT_APP_SERVER = 'http://127.0.0.1:8000/';

const Server = axios.create({
    baseURL: REACT_APP_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
Server.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

export default Server;