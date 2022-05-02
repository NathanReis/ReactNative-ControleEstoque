import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_BASE_URL
});

export default API;
