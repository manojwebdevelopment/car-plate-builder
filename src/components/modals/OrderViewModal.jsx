// src/components/modals/OrderViewModal.jsx
import React, { useState } from 'react';
import { formatDate } from '../utils/formatters';
import { NewtonsCradle } from 'ldrs/react';
import 'ldrs/react/NewtonsCradle.css';

const OrderViewModal = ({ order, onClose, loading, showToast }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  if (!order && !loading) return null;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
      case 'paid':
        return 'bg-success';
      case 'Pending':
      case 'pending':
        return 'bg-warning text-dark';
      case 'Shipped':
      case 'shipped':
        return 'bg-info';
      case 'Cancelled':
      case 'cancelled':
        return 'bg-danger';
      case 'processing':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  // Helper function to safely get customer name
  const getCustomerName = (order) => {
    if (!order) return 'N/A';
    
    // Handle new nested customer object structure
    if (order.customer && typeof order.customer === 'object') {
      const { firstName, lastName } = order.customer;
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }
      if (firstName) return firstName;
      if (lastName) return lastName;
      return 'Customer';
    }
    
    // Handle old flat structure (fallback)
    if (typeof order.customer === 'string') {
      return order.customer;
    }
    
    return order.customerName || 'N/A';
  };

  // Helper function to get shipping address
  const getShippingAddress = (order) => {
    // Try new nested structure first
    if (order.customer && typeof order.customer === 'object') {
      return {
        street: order.customer.address || 'Not provided',
        city: order.customer.city || 'Not provided',
        state: order.customer.state || '',
        postcode: order.customer.postcode || 'Not provided',
        country: order.customer.country || 'Not provided',
        phone: order.customer.phone || 'Not provided'
      };
    }
    
    // Fallback to existing shippingAddress structure
    return order.shippingAddress || null;
  };

  // Download PDF handler - IDM-friendly version with proper UX
  const handleDownloadPDF = async () => {
    // Basic validation
    if (!order || !order.orderId) {
      if (showToast) {
        showToast('Order information is missing. Please try again.', 'error');
      }
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 
                   import.meta.env.VITE_API_BASE_URL || 
                   'http://localhost:5000';
    
    const token = localStorage.getItem('adminToken') || 
                  localStorage.getItem('authToken') ||
                  localStorage.getItem('token');
    
    if (!token) {
      if (showToast) {
        showToast('Authentication required. Please login again.', 'error');
      }
      return;
    }

    setIsDownloading(true);
    
    try {
      console.log('Starting PDF download for order:', order.orderId);
      
      // Show optimistic success message immediately
      if (showToast) {
        showToast('Download started! Check your downloads folder.', 'info');
      }

      // Create download URL
      const downloadUrl = `${apiUrl}/api/orders/download-receipt/${order.orderId}`;
      
      // Method 1: Try fetch with shorter timeout for quick validation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        const response = await fetch(downloadUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Check for immediate errors (auth, not found, etc.)
        if (response.status === 401) {
          if (showToast) {
            showToast('Authentication failed. Please login again.', 'error');
          }
          return;
        }
        
        if (response.status === 404) {
          if (showToast) {
            showToast('Order not found. Please try again.', 'error');
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        // If fetch succeeds, try blob download
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `PlateForge-Order-${order.orderId}.pdf`;
        
        // Add to DOM and trigger download
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);
        
        if (showToast) {
          showToast('PDF download completed successfully!', 'success');
        }
        
        console.log('PDF download completed successfully');
        
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // If fetch fails or times out, fall back to direct URL method
        console.log('Fetch method failed, trying direct URL method:', fetchError.message);
        
        // Method 2: Direct URL approach (IDM-friendly)
        const downloadLink = document.createElement('a');
        downloadLink.href = `${downloadUrl}?token=${encodeURIComponent(token)}`;
        downloadLink.download = `PlateForge-Order-${order.orderId}.pdf`;
        downloadLink.target = '_blank';
        downloadLink.style.display = 'none';
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Show success message for direct method
        if (showToast) {
          showToast('Download initiated! If you have a download manager, please check its dialog.', 'success');
        }
        
        console.log('Direct URL download initiated');
      }
      
    } catch (error) {
      console.error('Download error:', error);
      
      // Only show error for real failures (not timeouts or IDM issues)
      if (error.name !== 'AbortError') {
        if (showToast) {
          showToast('Unable to start download. Please check your connection and try again.', 'error');
        }
      }
    } finally {
      // Always stop the loader after a reasonable delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000); // Give IDM time to take over
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading order details...</p>
              </div>
            ) : order ? (
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-warning mb-3">Order Information</h6>
                  <div className="mb-3">
                    <strong>Order ID:</strong> 
                    <span className="ms-2 font-monospace">{order.orderId}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Customer Name:</strong> 
                    <span className="ms-2">{getCustomerName(order)}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> 
                    <span className="ms-2">
                      {order.customer?.email || order.customerEmail || 'N/A'}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Phone:</strong> 
                    <span className="ms-2">
                      {order.customer?.phone || order.customerPhone || 'N/A'}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Product:</strong> 
                    <span className="ms-2">
                      {order.items && order.items.length > 0 
                        ? `${order.items.length} plate(s)` 
                        : order.product || 'Number Plate'
                      }
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Amount:</strong> 
                    <span className="ms-2 fw-bold text-success">
                      £{(order.pricing?.total || order.amount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Payment Status:</strong> 
                    <span className={`badge ms-2 ${getStatusBadgeClass(order.paymentStatus || order.status)}`}>
                      {order.paymentStatus || order.status || 'Unknown'}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Order Status:</strong> 
                    <span className={`badge ms-2 ${getStatusBadgeClass(order.orderStatus)}`}>
                      {order.orderStatus || 'Pending'}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Order Date:</strong> 
                    <span className="ms-2">
                      {formatDate(order.dates?.ordered || order.dateOfOrder || order.date || order.createdAt)}
                    </span>
                  </div>
                  {(order.notes || order.adminNotes) && (
                    <div className="mb-3">
                      <strong>Notes:</strong>
                      <div className="mt-1 p-2 bg-light rounded">
                        {order.notes || order.adminNotes}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="col-md-6">
                  <h6 className="text-warning mb-3">Shipping Address</h6>
                  {(() => {
                    const shippingAddress = getShippingAddress(order);
                    return shippingAddress ? (
                      <div className="border p-3 rounded bg-light">
                        <div className="mb-2">
                          <strong>Street:</strong> 
                          <span className="ms-2">{shippingAddress.street}</span>
                        </div>
                        <div className="mb-2">
                          <strong>City:</strong> 
                          <span className="ms-2">{shippingAddress.city}</span>
                        </div>
                        {shippingAddress.state && (
                          <div className="mb-2">
                            <strong>State:</strong> 
                            <span className="ms-2">{shippingAddress.state}</span>
                          </div>
                        )}
                        <div className="mb-2">
                          <strong>Postcode:</strong> 
                          <span className="ms-2 font-monospace">{shippingAddress.postcode}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Country:</strong> 
                          <span className="ms-2">{shippingAddress.country}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Phone:</strong> 
                          <span className="ms-2 font-monospace">{shippingAddress.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle"></i>
                        No shipping address available
                      </div>
                    );
                  })()}

                  {order.items && order.items.length > 0 && (
                    <div className="mt-4">
                      <h6 className="text-warning mb-3">Order Items</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Configuration</th>
                              <th>Qty</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <div>
                                    <strong>{item.name}</strong>
                                    {item.plateConfiguration?.text && (
                                      <div className="text-muted small">
                                        Text: <code>{item.plateConfiguration.text}</code>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="small">
                                  {item.plateConfiguration ? (
                                    <div>
                                      {item.plateConfiguration.plateStyle?.label && (
                                        <div>Style: {item.plateConfiguration.plateStyle.label}</div>
                                      )}
                                      {item.plateConfiguration.fontColor?.name && (
                                        <div>Color: {item.plateConfiguration.fontColor.name}</div>
                                      )}
                                      {item.plateConfiguration.roadLegal && (
                                        <div>Legal: {item.plateConfiguration.roadLegal}</div>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-muted">Standard</span>
                                  )}
                                </td>
                                <td className="text-center">{item.quantity || 1}</td>
                                <td className="text-end">£{(item.subtotal || item.price || 0).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {order.pricing && (
                    <div className="mt-4">
                      <h6 className="text-warning mb-3">Pricing Breakdown</h6>
                      <div className="border p-3 rounded bg-light">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Subtotal:</span>
                          <span>£{(order.pricing.subtotal || 0).toFixed(2)}</span>
                        </div>
                        {order.pricing.discount > 0 && (
                          <div className="d-flex justify-content-between mb-1 text-success">
                            <span>Discount:</span>
                            <span>-£{order.pricing.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="d-flex justify-content-between mb-1">
                          <span>Shipping:</span>
                          <span>{order.pricing.shipping > 0 ? `£${order.pricing.shipping.toFixed(2)}` : 'Free'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Tax:</span>
                          <span>£{(order.pricing.tax || 0).toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between fw-bold">
                          <span>Total:</span>
                          <span>£{(order.pricing.total || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle"></i>
                No order details available
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="bi bi-x-circle me-1"></i>
              Close
            </button>
            {order && (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                title="Download order details as PDF"
              >
                {isDownloading ? (
                  <div className="d-flex align-items-center">
                    <NewtonsCradle
                      size="20"
                      speed="1.4"
                      color="white"
                    />
                    <span className="ms-2">Generating PDF...</span>
                  </div>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-pdf me-1"></i>
                    Download PDF
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderViewModal;