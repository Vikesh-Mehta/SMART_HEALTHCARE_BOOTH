import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    dob?: string;
    gender?: string;
    bloodGroup?: string;
    address?: string;
  }) => api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  verify: () => api.get('/auth/verify'),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (userData: Partial<{
    name: string;
    phone: string;
    dob: string;
    address: string;
    gender: string;
    bloodGroup: string;
    height: string;
    weight: string;
    allergies: string;
    chronicConditions: string;
  }>) => api.put('/user/profile', userData),
  
  getAppointments: () => api.get('/user/appointments'),
  
  createAppointment: (appointmentData: {
    date: string;
    time: string;
    doctor: string;
    type: string;
    status?: string;
  }) => api.post('/user/appointments', appointmentData),
  
  generateSampleData: () => api.post('/user/generate-sample-data'),
};

export const healthAPI = {
  getRecords: () => api.get('/health/records'),
  
  getLatestMetrics: () => api.get('/health/metrics/latest'),
  
  createRecord: (recordData: {
    metrics: {
      heartRate: { value: number; unit: string; status: string };
      bloodPressure: { value: string; unit: string; status: string };
      bloodSugar: { value: number; unit: string; status: string };
      oxygenLevel: { value: number; unit: string; status: string };
    };
    notes?: string;
  }) => api.post('/health/records', recordData),
  
  getActivities: () => api.get('/health/activities'),
};

export default api;
