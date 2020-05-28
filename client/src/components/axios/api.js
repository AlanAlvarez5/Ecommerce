import axios from 'axios';
export const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://3.15.2.165/api' : 'http://localhost:3000/api',
});