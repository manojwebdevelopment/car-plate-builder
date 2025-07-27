// Create this file: src/utils/printUtils.js
// Utility functions for handling print operations

export const getApiUrl = () => {
  // Check various environment variable names
  return import.meta.env.VITE_API_URL || 
         import.meta.env.VITE_API_BASE_URL || 
         import.meta.env.VITE_BACKEND_URL ||
         'http://localhost:5000';
};

export const getAuthToken = () => {
  return localStorage.getItem('adminToken') || 
         localStorage.getItem('authToken') ||
         localStorage.getItem('token');
};

export const openPrintWindow = (orderId) => {
  const apiUrl = getApiUrl();
  const printUrl = `${apiUrl}/admin/print-order/${orderId}`;
  
  // Open in new window with specific dimensions for optimal printing
  const printWindow = window.open(
    printUrl, 
    '_blank', 
    'width=900,height=700,scrollbars=yes,resizable=yes'
  );
  
  if (!printWindow) {
    alert('Please allow popups for this site to open the print view.');
    return false;
  }
  
  return true;
};

export const downloadOrderPDF = async (orderId) => {
  try {
    const apiUrl = getApiUrl();
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch(`${apiUrl}/api/admin/orders/${orderId}/pdf`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      }
      throw new Error(`Failed to generate PDF: ${response.status}`);
    }

    // Check if response is JSON (error) or PDF
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate PDF');
    }

    // Handle PDF download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `Order-${orderId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
    
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

// Alternative method using window.print() for better browser compatibility
export const printOrderDetails = (orderId) => {
  const apiUrl = getApiUrl();
  const printUrl = `${apiUrl}/admin/print-order/${orderId}`;
  
  // Create iframe for printing
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = printUrl;
  document.body.appendChild(iframe);
  
  iframe.onload = () => {
    iframe.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
  
  iframe.onerror = () => {
    document.body.removeChild(iframe);
    alert('Failed to load print view. Please try again.');
  };
};

// Validation function for order data
export const validateOrderForPrint = (order) => {
  if (!order) {
    throw new Error('Order data is required');
  }
  
  if (!order.orderId) {
    throw new Error('Order ID is missing');
  }
  
  return true;
};