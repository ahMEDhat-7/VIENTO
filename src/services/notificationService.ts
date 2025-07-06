import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getNotifications = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const markAsRead = async (id: string, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/notifications/${id}`, { read: true }, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const deleteNotification = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/notifications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 