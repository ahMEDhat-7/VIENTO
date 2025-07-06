import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getCart = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const addToCart = async (item: any, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, item, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateCart = async (item: any, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/cart`, item, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const removeFromCart = async (itemId: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 