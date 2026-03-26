/// <reference types="vite/client" />
import axios from 'axios';

// Vite resolves VITE_API_URL statically during build time on Vercel
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('elevate_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('elevate_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth ───────────────────────────────────────
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  googleLogin: (data: { token: string }) =>
    api.post('/auth/google', data),
  getMe: () => api.get('/auth/me'),
};

// ─── CV ─────────────────────────────────────────
export const cvAPI = {
  get: () => api.get('/cv'),
  update: (data: any) => api.put('/cv', data),
  getPublic: (id: string) => api.get(`/cv/share/${id}`),
};

// ─── Cover Letter ───────────────────────────────
export const coverLetterAPI = {
  get: () => api.get('/cover-letter'),
  update: (data: any) => api.put('/cover-letter', data),
};

// ─── Upload ─────────────────────────────────────
export const uploadAPI = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ─── Admin ──────────────────────────────────────
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  getMessages: () => api.get('/admin/messages'),
  getAssets: () => api.get('/admin/assets'),
};

// ─── Templates ──────────────────────────────────
export const templatesAPI = {
  getAll: () => api.get('/templates'),
  getCVTemplates: () => api.get('/templates/cv'),
  getCoverLetterTemplates: () => api.get('/templates/cover-letter'),
};

// ─── Contact (public) ───────────────────────────
export const contactAPI = {
  send: (data: { name: string; email: string; message: string }) =>
    api.post('/admin/messages', data),
};

// ─── AI ─────────────────────────────────────────
export const aiAPI = {
  enhance: (type: string, content: string) => api.post('/ai/enhance', { type, content }),
  parseResume: (text: string) => api.post('/ai/parse-resume', { text }),
  generateCoverLetter: (data: any) => api.post('/ai/generate-cover-letter', data),
  generateEmail: (data: any) => api.post('/ai/generate-email', data),
};

export default api;
