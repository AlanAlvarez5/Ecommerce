import axios from 'axios';
export const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://52.14.69.133/api' : 'http://localhost:3000/api',
});