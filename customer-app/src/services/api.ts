import axios from 'axios';
import config from '../config';

const api = axios.create({ baseURL: config.apiUrl || 'http://localhost:3000/api' });

export default api;
