import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6ae34d78933120ae20f8a024.mockapi.io',
});

export default api;