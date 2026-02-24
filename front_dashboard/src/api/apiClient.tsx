import axios from 'axios';

const apiClient = axios.create({
  //baseURL: '/api',
  baseURL: 'https://dashboard-s9vm.onrender.com/dashboard',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
