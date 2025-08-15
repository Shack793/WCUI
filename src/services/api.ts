import axiosInstance from '@/lib/axios';
import type { DebitWalletPayload, DebitWalletResponse, CheckStatusResponse } from '@/lib/types';

// Use the shared axiosInstance from lib/axios.ts, which already has the correct baseURL and interceptors
// No need to create a new instance or set withCredentials
const api = axiosInstance;

// Campaign API endpoints
export const campaignApi = {
  getAll: () => api.get('/campaigns'),
  getAllCampaigns: () => api.get('/campaigns/all'),
  getRunning: () => api.get('/campaigns'),
  getTrending: () => api.get('/campaigns/trending'),
  getByCategory: (categoryId: number) => api.get(`/categories/${categoryId}/campaigns`),
  getById: (id: number) => api.get(`/campaigns/${id}`),
  getBySlug: (slug: string) => api.get(`/campaigns/${slug}`),
  getPublic: () => api.get('/campaigns/public'),
  getRecentDonations: (slug: string) => api.get(`/campaigns/${slug}/donations/recent`),
  create: (data: any) => api.post('/campaigns', data),
  donate: (campaignId: number, data: any) => api.post(`/campaigns/${campaignId}/donations`, data),
  donateGuest: (slug: string, data: any) => api.post(`/campaigns/${slug}/donate/guest`, data),
};

// Category API endpoints
export const categoryApi = {
  getAll: () => api.get('/categories'),
};

// Payment Methods API endpoints
export const paymentApi = {
  getPublicMethods: () => api.get('/payment-methods/public'),
  donate: (campaignId: number, data: any) => api.post(`/campaigns/${campaignId}/donate`, data),
  donateGuest: (campaignId: number, data: any) => api.post(`/campaigns/${campaignId}/donate/guest`, data),
};

// Auth API endpoints
export const authApi = {
  login: (credentials: any) => api.post('/login', credentials),
  register: (userData: any) => api.post('/register', userData),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

export const paymentsApi = {
  debitWallet: (payload: DebitWalletPayload) => axiosInstance.post<DebitWalletResponse>('/payments/debit-wallet', payload),
  checkStatus: (refNo: string) => axiosInstance.get<CheckStatusResponse>(`/payments/check-status/${refNo}`),
};

// Wallet API endpoints
export const walletApi = {
  nameEnquiry: (data: { msisdn: string; network: string }) => api.post('/wallet/name-enquiry', data),
};

export default api;