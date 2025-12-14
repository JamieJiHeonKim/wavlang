// API Configuration
export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
export const API_URL = `${API_BASE_URL}/api`;

// Export for convenience
export default {
  API_BASE_URL,
  API_URL
};

