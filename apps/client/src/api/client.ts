import axios from 'axios';
import { API_URL, USE_MOCK } from '../config/env';

export const api = USE_MOCK
  ? {
    get: async (url: string) => ({ data: `MOCK GET ${url}` }),
  }
  : axios.create({
    baseURL: API_URL,
    withCredentials: true
  });