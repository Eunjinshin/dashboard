import axios from 'axios';

const apiClient = axios.create({
  //baseURL: '/api',
  baseURL: 'https://dashboard-s9vm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
