import axios from 'axios';
import { API_URL, USE_MOCK } from '../config/env';
import { store } from '../store';
import { config } from 'dotenv';

// axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// axios request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('Unauthorized - token might be invalid');
    }
    return Promise.reject(error);
  }
);

export const api = USE_MOCK
  ? {
    get: async (url: string) => ({ data: `MOCK GET ${url}` }),
    post: async (url: string, data: any) => ({ data: `MOCK POST ${url}` }),
  }
  : apiClient;
