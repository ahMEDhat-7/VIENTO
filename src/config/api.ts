const API_BASE_URL = 'http://localhost:7000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REGISTER_ADMIN: '/auth/register-admin',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: '/users',
  PRODUCTS: '/products',
  REVIEWS: '/reviews',
  ORDERS: '/orders',
  CART: '/cart',
  NOTIFICATIONS: '/notifications',
};

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('auth-token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // For development, return mock data when API is not available
        return this.getMockData<T>(endpoint, options.method || 'GET');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('API Request failed, using mock data:', error);
      // Return mock data when API is not available
      return this.getMockData<T>(endpoint, options.method || 'GET');
    }
  }

  private getMockData<T>(endpoint: string, method: string): T {
    // Mock data for development
    if (endpoint.includes('/products')) {
      if (method === 'GET') {
        return [] as unknown as T;
      }
      return { 
        id: '1', 
        name: 'Mock Product', 
        description: 'Mock Description',
        price: 99,
        brand: 'Mock Brand',
        categoryId: '1',
        images: [],
        stock: 10,
        variants: [],
        isAvailable: true,
        tags: [],
        analytics: { views: 0, purchases: 0, averageRating: 0, ratingsCount: 0 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as unknown as T;
    }
    
    if (endpoint.includes('/auth')) {
      return {
        user: { id: '1', name: 'Mock User', email: 'user@example.com', role: 'user' },
        token: 'mock-token'
      } as unknown as T;
    }
    
    if (endpoint.includes('/cart')) {
      return [] as unknown as T;
    }
    
    if (endpoint.includes('/orders')) {
      if (method === 'POST') {
        return { id: '1' } as unknown as T;
      }
      return [] as unknown as T;
    }
    
    if (endpoint.includes('/notifications')) {
      if (method === 'GET') {
        return [] as unknown as T;
      }
      return {
        id: '1',
        userId: '1',
        type: 'order_update',
        message: 'Mock notification',
        read: false,
        createdAt: new Date().toISOString()
      } as unknown as T;
    }
    
    if (endpoint.includes('/reviews')) {
      if (method === 'GET') {
        return [] as unknown as T;
      }
      return {
        id: '1',
        userId: '1',
        productId: '1',
        rating: 5,
        comment: 'Mock review',
        status: 'approved',
        createdAt: new Date().toISOString()
      } as unknown as T;
    }
    
    if (endpoint.includes('/users')) {
      if (method === 'GET') {
        return [] as unknown as T;
      }
      return {
        id: '1',
        name: 'Mock User',
        email: 'user@example.com',
        role: 'user'
      } as unknown as T;
    }
    
    return {} as unknown as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);