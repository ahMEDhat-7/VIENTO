import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getOrders = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const getOrderById = async (id: string, token: string) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const createOrder = async (orderData: any, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateOrder = async (id: string, updates: any, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const deleteOrder = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 