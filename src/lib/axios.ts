import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://crowdfundingapi.wgtesthub.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Only handle 401 if not already on login page and not on a public route
      const publicRoutes = ['/', '/about', '/campaign', '/faq', '/volunteer', '/success-story', '/all-campaigns', '/public-campaigns', '/upcoming-campaigns', '/contact'];
      const isPublicRoute = publicRoutes.some(route => window.location.pathname === route) 
        || window.location.pathname.startsWith('/donate/') 
        || window.location.pathname.startsWith('/DonationsPage/')
        || window.location.pathname.startsWith('/campaign/');
      
      if (!window.location.pathname.includes('/login') && !isPublicRoute) {
        // Clear token
        localStorage.removeItem('token');
        // Use window.location.replace to avoid adding to history
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;