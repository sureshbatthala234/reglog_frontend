// Base API Service for RegLog Frontend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/auth';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('reglog_token', token);
  } else {
    localStorage.removeItem('reglog_token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('reglog_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('reglog_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const authApi = {
  register: (payload) => request('/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: async () => {
    try {
      await request('/logout', { method: 'POST' });
    } finally {
      removeAuthToken();
    }
  },
  getMe: () => request('/me', { method: 'GET' }),
  forgotPassword: (identifier) => request('/forgot-password', { method: 'POST', body: JSON.stringify({ identifier }) }),
  verifyOtp: (identifier, otp) => request('/verify-otp', { method: 'POST', body: JSON.stringify({ identifier, otp }) }),
  resetPassword: (payload) => request('/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
  changePassword: (payload) => request('/change-password', { method: 'PUT', body: JSON.stringify(payload) }),
};
