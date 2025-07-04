import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signUp: async (email: string, password: string) => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },
  
  signIn: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
  },
};

// Todos API
export const todosAPI = {
  getAll: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  
  create: async (todo: any) => {
    const response = await api.post('/todos', todo);
    return response.data;
  },
  
  update: async (id: string, updates: any) => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
};