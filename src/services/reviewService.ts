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
    return response as Review;
  },

  async getReviews(): Promise<Review[]> {
    const response = await apiClient.get(ENDPOINTS.REVIEWS);
    return Array.isArray(response) ? response : [];
  },

  async getProductReviews(productId: string): Promise<Review[]> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/product/${productId}`);
    return Array.isArray(response) ? response : [];
  },

  async getUserReviews(userId: string): Promise<Review[]> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/user/${userId}`);
    return Array.isArray(response) ? response : [];
  },

  async getPendingReviews(): Promise<Review[]> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/pending`);
    return Array.isArray(response) ? response : [];
  },

  async getProductReviewStats(productId: string): Promise<ReviewStats> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/product/${productId}/stats`);
    return response as ReviewStats;
  },

  async getReviewStats(): Promise<ReviewStats> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/stats`);
    return response as ReviewStats;
  },

  async getReviewById(id: string): Promise<Review> {
    const response = await apiClient.get(`${ENDPOINTS.REVIEWS}/${id}`);
    return response as Review;
  },

  async updateReviewStatus(id: string, status: Review['status']): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.REVIEWS}/${id}/status`, { status });
  },

  async updateReview(id: string, updates: Partial<Review>): Promise<Review> {
    const response = await apiClient.patch(`${ENDPOINTS.REVIEWS}/${id}`, updates);
    return response as Review;
  },

  async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.REVIEWS}/${id}`);
  }
};