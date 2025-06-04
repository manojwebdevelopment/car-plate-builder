// src/utils/validators.js

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Validate UK postcode format
 * @param {string} postcode - Postcode to validate
 * @returns {boolean} True if valid UK postcode format
 */
export const isValidUKPostcode = (postcode) => {
  if (!postcode) return false;
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
  return postcodeRegex.test(postcode.trim());
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} Validation result
 */
export const validateRequired = (value, fieldName = 'Field') => {
  const isValid = value !== null && value !== undefined && 
                  (typeof value === 'string' ? value.trim() !== '' : true);
  
  return {
    isValid,
    error: isValid ? null : `${fieldName} is required`
  };
};

/**
 * Validate string length
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result
 */
export const validateLength = (value, minLength, maxLength, fieldName = 'Field') => {
  if (!value) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const length = value.toString().length;
  
  if (length < minLength) {
    return { 
      isValid: false, 
      error: `${fieldName} must be at least ${minLength} characters` 
    };
  }
  
  if (maxLength && length > maxLength) {
    return { 
      isValid: false, 
      error: `${fieldName} must not exceed ${maxLength} characters` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate numeric value
 * @param {any} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result
 */
export const validateNumber = (value, min = null, max = null, fieldName = 'Value') => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, error: `${fieldName} must be a valid number` };
  }
  
  if (min !== null && numValue < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }
  
  if (max !== null && numValue > max) {
    return { isValid: false, error: `${fieldName} must not exceed ${max}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate price value
 * @param {any} price - Price to validate
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result
 */
export const validatePrice = (price, fieldName = 'Price') => {
  if (price === null || price === undefined || price === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const numPrice = parseFloat(price);
  
  if (isNaN(numPrice)) {
    return { isValid: false, error: `${fieldName} must be a valid number` };
  }
  
  if (numPrice < 0) {
    return { isValid: false, error: `${fieldName} cannot be negative` };
  }
  
  if (numPrice > 999999.99) {
    return { isValid: false, error: `${fieldName} is too large` };
  }
  
  // Check for more than 2 decimal places
  if (!/^\d+(\.\d{1,2})?$/.test(price.toString())) {
    return { isValid: false, error: `${fieldName} can have at most 2 decimal places` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate user form data
 * @param {object} userData - User data to validate
 * @param {boolean} isEdit - Whether this is an edit operation
 * @returns {object} Validation result with errors object
 */
export const validateUserForm = (userData, isEdit = false) => {
  const errors = {};
  
  // First name validation
  const firstNameValidation = validateRequired(userData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error;
  }
  
  // Last name validation
  const lastNameValidation = validateRequired(userData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error;
  }
  
  // Email validation
  if (!userData.email || !userData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(userData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  if (!userData.phone || !userData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(userData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Password validation (only for new users or when password is provided)
  if (!isEdit && !userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password) {
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]; // Show first error
    }
  }
  
  // Confirm password validation
  if (!isEdit && userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  // Address validation
  const addressValidation = validateRequired(userData.address, 'Address');
  if (!addressValidation.isValid) {
    errors.address = addressValidation.error;
  }
  
  // City validation
  const cityValidation = validateRequired(userData.city, 'City');
  if (!cityValidation.isValid) {
    errors.city = cityValidation.error;
  }
  
  // Postcode validation
  if (!userData.postcode || !userData.postcode.trim()) {
    errors.postcode = 'Postcode is required';
  } else if (!isValidUKPostcode(userData.postcode)) {
    errors.postcode = 'Please enter a valid UK postcode';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate contact form data
 * @param {object} contactData - Contact data to validate
 * @returns {object} Validation result with errors object
 */
export const validateContactForm = (contactData) => {
  const errors = {};
  
  // Name validation
  const nameValidation = validateRequired(contactData.name, 'Name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }
  
  // Email validation
  if (!contactData.email || !contactData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(contactData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  const phoneValidation = validateRequired(contactData.phone, 'Phone number');
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }
  
  // Message validation
  const messageValidation = validateLength(contactData.message, 10, 500, 'Message');
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate configuration/price form data
 * @param {object} configData - Configuration data to validate
 * @returns {object} Validation result with errors object
 */
export const validateConfigForm = (configData) => {
  const errors = {};
  
  // Label validation
  const labelValidation = validateLength(configData.label, 1, 100, 'Name');
  if (!labelValidation.isValid) {
    errors.label = labelValidation.error;
  }
  
  // Price validation
  const priceValidation = validatePrice(configData.price, 'Price');
  if (!priceValidation.isValid) {
    errors.price = priceValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitize string input to prevent XSS
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {object} Validation result
 */
export const validateFile = (file, allowedTypes = [], maxSize = 5 * 1024 * 1024) => {
  if (!file) {
    return { isValid: false, error: 'Please select a file' };
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return { 
      isValid: false, 
      error: `File size too large. Maximum size: ${maxSizeMB}MB` 
    };
  }
  
  return { isValid: true, error: null };
};