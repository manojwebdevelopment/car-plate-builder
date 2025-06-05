// utils/api.js
export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`http://localhost:5000${url}`, {
    ...options,
    headers
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('adminToken');
    throw new Error('Authentication failed');
  }

  return response;
};

// utils/formatters.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

export const formatPrice = (price) => {
  return `£${parseFloat(price).toFixed(2)}`;
};