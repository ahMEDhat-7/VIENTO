import { apiClient, ENDPOINTS } from '../config/api';
import { Review } from '../types/store';

export interface CreateReviewData {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  pendingReviews: number;
  approvedReviews: number;
}

export const reviewService = {
  async createReview(reviewData: CreateReviewData): Promise<Review> {
    const response = await apiClient.post(ENDPOINTS.REVIEWS, {
      ...reviewData,
      status: 'pending'
    });
    return response;
  },

  async getReviews(): Promise<Review[]> {
    const response = await apiClient.get(ENDPOINTS.REVIEWS);
    return response;
  },

  async getProductReviews(productId: string): Promise<Review[]> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/product/${productId}`);
    return response;
  },

  async getUserReviews(userId: string): Promise<Review[]> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/user/${userId}`);
    return response;
  },

  async getPendingReviews(): Promise<Review[]> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/pending`);
    return response;
  },

  async getProductReviewStats(productId: string): Promise<ReviewStats> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/product/${productId}/stats`);
    return response;
  },

  async getReviewStats(): Promise<ReviewStats> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/stats`);
    return response;
  },

  async getReviewById(id: string): Promise<Review> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/${id}`);
    return response;
  },

  async updateReviewStatus(id: string, status: Review['status']): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.REVIEWS}/${id}/status`, { status });
  },

  async updateReview(id: string, updates: Partial<Review>): Promise<Review> {
    const response = await apiClient.patch(`${ENDPOINTS.REVIEWS}/${id}`, updates);
    return response;
  },

  async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.REVIEWS}/${id}`);
  }
};