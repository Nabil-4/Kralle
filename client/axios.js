import axios from 'axios'

export const baseURL = 'Your adresss ip + port';

export const Request = axios.create({
    baseURL: baseURL,
    withCredentials: true
})