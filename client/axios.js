import axios from 'axios';

export const baseURL = 'Adress ip and port of your backend server';

export const Request = axios.create({
    baseURL: baseURL,
    withCredentials: true
})