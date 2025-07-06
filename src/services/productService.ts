import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    withCredentials: true,
  });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createProduct = async (productData: any, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateProduct = async (id: string, updates: any, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/products/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 