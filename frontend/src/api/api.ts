import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5065/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;