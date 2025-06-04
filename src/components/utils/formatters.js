// src/utils/formatters.js

/**
 * Format date to "Jun 01, 2025" format
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Format date and time to "Jun 01, 2025 2:30 PM" format
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Format price with currency symbol
 * @param {number|string} price - Price to format
 * @param {string} currency - Currency symbol (default: '£')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = '£') => {
  if (price === null || price === undefined || price === '') return `${currency}0.00`;
  
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return `${currency}0.00`;
  
  return `${currency}${numPrice.toFixed(2)}`;
};

/**
 * Format currency for Indian Rupees
 * @param {number|string} price - Price to format
 * @returns {string} Formatted price string with ₹ symbol
 */
export const formatRupees = (price) => {
  return formatPrice(price, '₹');
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    // US format: (123) 456-7890
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    // US with country code: +1 (123) 456-7890
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length > 10) {
    // International format: +XX XXX XXX XXXX
    return `+${cleaned.slice(0, -10)} ${cleaned.slice(-10, -7)} ${cleaned.slice(-7, -4)} ${cleaned.slice(-4)}`;
  }
  
  // Return as-is if no standard format matches
  return phone;
};

/**
 * Format file size in bytes to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format percentage with specified decimal places
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '0%';
  
  return `${numValue.toFixed(decimals)}%`;
};

/**
 * Format numbers with thousand separators
 * @param {number|string} number - Number to format
 * @returns {string} Formatted number with commas
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined || number === '') return '0';
  
  const num = parseFloat(number);
  if (isNaN(num)) return '0';
  
  return num.toLocaleString();
};

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format text to title case
 * @param {string} text - Text to format
 * @returns {string} Title case text
 */
export const toTitleCase = (text) => {
  if (!text) return '';
  
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Format user's full name
 * @param {object} user - User object with firstName and lastName
 * @returns {string} Formatted full name
 */
export const formatUserName = (user) => {
  if (!user) return 'Unknown User';
  
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  
  return `${firstName} ${lastName}`.trim() || 'Unknown User';
};

/**
 * Format address for display
 * @param {object} address - Address object
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return 'No address provided';
  
  const parts = [
    address.street,
    address.city,
    address.state,
    address.pincode || address.postcode,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ') || 'No address provided';
};

/**
 * Format duration in milliseconds to human readable format
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (milliseconds) => {
  if (!milliseconds || milliseconds < 0) return '0 seconds';
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  return `${seconds} second${seconds !== 1 ? 's' : ''}`;
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {string|Date} dateString - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'Unknown';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    
    if (diffMs < 0) return 'In the future';
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSeconds < 60) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    // For older dates, return formatted date
    return formatDate(dateString);
  } catch (error) {
    return 'Unknown';
  }
};