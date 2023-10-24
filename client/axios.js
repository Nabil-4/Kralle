import axios from 'axios'

export const Request = axios.create({
    baseURL: 'http://192.168.1.12:8080',
    withCredentials: true
})