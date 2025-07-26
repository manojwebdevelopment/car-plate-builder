import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from 'ldrs/react';
import 'ldrs/react/Grid.css';
import './PaymentSuccessPage.css';

const UnifiedPaymentSuccessPage = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState('0px');
    const [isDownloading, setIsDownloading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const detailsRef = useRef(null);
    
    const location = useLocation();
    const navigate = useNavigate();

    // Generate a short, user-friendly order number for display
    const generateDisplayOrderNumber = (fullOrderId) => {
        if (!fullOrderId) return 'N/A';
        
        // Extract timestamp and create a shorter format
        // From: ORD_1751253712696_43xibdxtu
        // To: 751-2537-126 (last 9 digits of timestamp in groups)
        const timestamp = fullOrderId.split('_')[1];
        if (timestamp && timestamp.length >= 9) {
            const last9 = timestamp.slice(-9);
            return `${last9.slice(0,3)}-${last9.slice(3,7)}-${last9.slice(7,9)}`;
        }
        
        // Fallback: Use last 8 characters
        return fullOrderId.slice(-8).toUpperCase();
    };

    const showToast = (message, type = 'success') => {
        setToastMessage({ message, type });
        // Auto hide after 4 seconds
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };

    const toggleDetails = () => {
        setIsDetailsOpen(!isDetailsOpen);
    };

    useEffect(() => {
        if (detailsRef.current) {
            if (isDetailsOpen) {
                const scrollHeight = detailsRef.current.scrollHeight;
                setContentHeight(`${scrollHeight}px`);
                
                // Set to auto after animation for responsive behavior
                const timer = setTimeout(() => {
                    setContentHeight('auto');
                }, 500);
                
                return () => clearTimeout(timer);
            } else {
                const scrollHeight = detailsRef.current.scrollHeight;
                setContentHeight(`${scrollHeight}px`);
                
                setTimeout(() => {
                    setContentHeight('0px');
                }, 10);
            }
        }
    }, [isDetailsOpen]);

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            const urlParams = new URLSearchParams(location.search);
            const token = urlParams.get('token');
            const PayerID = urlParams.get('PayerID');
            
            console.log('🔥 Payment Success Page - URL Params:', { token, PayerID });
            
            if (!token) {
                setError('Missing payment information');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/capture-paypal-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paypalOrderId: token
                    })
                });

                const result = await response.json();
                console.log('💰 Capture Response:', result);

                if (result.success) {
                    setOrderData({
                        orderId: result.orderId,           // ❌ WAS: result.data.orderId
                        displayOrderNumber: generateDisplayOrderNumber(result.orderId), // ❌ WAS: result.data.orderId
                        amount: result.amount,             // ❌ WAS: result.data.amount
                        currency: result.currency,         // ❌ WAS: result.data.currency
                        paymentId: result.paymentId,       // ❌ WAS: result.data.paymentId
                        status: result.status,             // ❌ WAS: result.data.paymentStatus
                        provider: 'PayPal'
                    });
                    
                    // Clean up any temporary localStorage data
                    localStorage.removeItem('sessionId');
                    localStorage.removeItem('customerInfo');
                    localStorage.removeItem('shippingAddress');
                    localStorage.removeItem('guestSessionId');

                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                } else {
                    setError(result.error || 'Payment processing failed');
                }
            } catch (error) {
                console.error('Error capturing payment:', error);
                setError('Failed to process payment');
            } finally {
                setLoading(false);
            }
        };

        handlePaymentSuccess();
    }, [location]);

    const handleDownloadReceipt = async () => {
        setIsDownloading(true);
        
        try {
            console.log('Downloading receipt for order:', orderData?.orderId);
            
            // Call your backend API to generate and download the premium PDF
            const response = await fetch(`http://localhost:5000/api/orders/download-receipt/${orderData?.orderId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf'
                }
            });
            
            // Check if the response is successful
            if (!response.ok) {
                let errorMessage = 'Failed to generate PDF receipt';
                
                // Try to get error details from response
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (parseError) {
                    // Response might not be JSON, use status text
                    errorMessage = response.statusText || errorMessage;
                }
                
                throw new Error(errorMessage);
            }
            
            // Convert response to blob for download
            const blob = await response.blob();
            
            // Create download link and trigger download
            const url = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `PlateForge-Receipt-${orderData?.displayOrderNumber || orderData?.orderId || 'Order'}.pdf`;
            
            // Append to body, click, and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Clean up the blob URL
            window.URL.revokeObjectURL(url);
            
            showToast('Premium PDF receipt downloaded successfully! 📄', 'success');
            
        } catch (error) {
            console.error('Error downloading PDF receipt:', error);
            showToast(`Failed to download receipt: ${error.message}`, 'error');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="payment-success-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Processing your payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="payment-success-container">
                <div className="error-card">
                    <h2>Payment Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/cart')} className="btn-primary">
                        Return to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-success-container">
            {/* Toast Notification */}
            {toastMessage && (
                <div className={`toast ${toastMessage.type}`}>
                    <div className="toast-content">
                        <span className="toast-icon">
                            {toastMessage.type === 'success' ? '✅' : '❌'}
                        </span>
                        <span className="toast-message">{toastMessage.message}</span>
                    </div>
                    <button 
                        className="toast-close"
                        onClick={() => setToastMessage(null)}
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="success-card">
                <div className="success-header">
                    <div className="checkmark">✓</div>
                    <h1>Order Placed Successfully!</h1>
                    <p className="success-subtitle">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>

                <div className="order-summary">
                    <div className="summary-row">
                        <span className="summary-label">Order Number:</span>
                        <span className="summary-value order-number">{orderData?.displayOrderNumber}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Total Paid:</span>
                        <span className="summary-value amount">£{orderData?.amount}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Payment Method:</span>
                        <span className="summary-value">
                            <span className="payment-badge">PayPal</span>
                        </span>
                    </div>
                </div>

                <div className="delivery-info">
                    <h3>📦 What happens next?</h3>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-icon">✉️</div>
                            <div className="timeline-content">
                                <strong>Email confirmation</strong>
                                <p>You'll receive an order confirmation email shortly</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-icon">🔨</div>
                            <div className="timeline-content">
                                <strong>Manufacturing</strong>
                                <p>Your plates will be manufactured within 3-5 business days</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-icon">🚚</div>
                            <div className="timeline-content">
                                <strong>Delivery</strong>
                                <p>Estimated delivery: 5-7 business days</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-section">
                    <button onClick={handleContinueShopping} className="btn-primary">
                        Continue Shopping
                    </button>
                    <button 
                        onClick={handleDownloadReceipt} 
                        className="btn-secondary"
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <>
                                <Grid size="20" speed="1.5" color="#333" />
                                Generating...
                            </>
                        ) : (
                            <>
                                📄 Download Receipt
                            </>
                        )}
                    </button>
                </div>

                {/* Smooth Expandable Order Details */}
                <div className={`order-details-expandable ${isDetailsOpen ? 'expanded' : 'collapsed'}`}>
                    <button
                        className="expandable-header"
                        onClick={toggleDetails}
                        aria-expanded={isDetailsOpen}
                        type="button"
                    >
                        <span>View order details</span>
                        <span 
                            className="expandable-arrow"
                            style={{
                                transform: isDetailsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            ▼
                        </span>
                    </button>
                    <div
                        className="expandable-content"
                        style={{
                            height: contentHeight,
                            transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <div ref={detailsRef} className="expandable-content-inner">
                            <div className="detailed-info">
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Order ID:</span>
                                        <span className="detail-value monospace">{orderData?.orderId}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Transaction ID:</span>
                                        <span className="detail-value monospace-small">{orderData?.paymentId}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Order Date:</span>
                                        <span className="detail-value">
                                            {new Date().toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Currency:</span>
                                        <span className="detail-value">{orderData?.currency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnifiedPaymentSuccessPage;
