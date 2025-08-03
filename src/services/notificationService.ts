import { apiClient, ENDPOINTS } from '../config/api';
import { Notification } from '../types/store';

export interface CreateNotificationData {
  userId: string;
  type: Notification['type'];
  message: string;
}

export interface NotificationStats {
  totalNotifications: number;
  unreadCount: number;
}

export const notificationService = {
  async createNotification(notificationData: CreateNotificationData): Promise<Notification> {
    const response = await apiClient.post(ENDPOINTS.NOTIFICATIONS, {
      ...notificationData,
      read: false
    });
    return response as Notification;
  },

  async getNotifications(): Promise<Notification[]> {
    const response = await apiClient.get(ENDPOINTS.NOTIFICATIONS);
    return Array.isArray(response) ? response : [];
  },

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const response = await apiClient.get(`${ENDPOINTS.NOTIFICATIONS}/user/${userId}`);
    return Array.isArray(response) ? response : [];
  },

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    const response = await apiClient.get(`${ENDPOINTS.NOTIFICATIONS}/user/${userId}/unread`);
    return Array.isArray(response) ? response : [];
  },

  async getNotificationStats(userId: string): Promise<NotificationStats> {
    const response = await apiClient.get(`${ENDPOINTS.NOTIFICATIONS}/user/${userId}/stats`);
    return response as NotificationStats;
  },

  async getNotificationById(id: string): Promise<Notification> {
    const response = await apiClient.get(`${ENDPOINTS.NOTIFICATIONS}/${id}`);
    return response as Notification;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.NOTIFICATIONS}/${id}/read`, {});
  },

  async markAllAsRead(userId: string): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.NOTIFICATIONS}/user/${userId}/read-all`, {});
  },

  async updateNotification(id: string, updates: Partial<Notification>): Promise<Notification> {
    const response = await apiClient.patch(`${ENDPOINTS.NOTIFICATIONS}/${id}`, updates);
    return response as Notification;
  },

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.NOTIFICATIONS}/${id}`);
  }
};
