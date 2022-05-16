import axios from 'axios';
import environment from '../config/environment';

const API = axios.create({
  baseURL: environment.API_BASE_URL
});

export default API;
