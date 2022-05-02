import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
});

//interceptors work with jwt token to refresh if the initial request is denied due to an expired token 
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});