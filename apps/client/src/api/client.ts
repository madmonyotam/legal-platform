import axios from 'axios';
import { API_URL, USE_MOCK } from '../config/env';
import { store } from '../store';
import { logoutUser } from '../store/slices/authSlice';

// axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  // withCredentials: true // מבטל כרגע
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
    if (error.response?.status === 401) {
      // נקה את המצב ב-Redux
      store.dispatch(logoutUser());
      
      // הפנה ללוגאין
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = USE_MOCK
  ? {
    get: async (url: string) => ({ data: `MOCK GET ${url}` }),
    post: async (url: string, _data: any) => ({ data: `MOCK POST ${url}` }),
  }
  : apiClient;
