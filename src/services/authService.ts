import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, { username: name, email, password }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const registerAdmin = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register-admin`, { username: name, email, password }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const refresh = async (token: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 