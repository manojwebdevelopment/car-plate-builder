import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, AlertCircle, CreditCard } from 'lucide-react';

const UnifiedPaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentProvider, setPaymentProvider] = useState(null);
    const navigate = useNavigate();
    const hasProcessed = useRef(false); // Prevent double processing

    useEffect(() => {
        // Prevent multiple executions
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const handlePaymentSuccess = async () => {
            try {
                // Check for PayPal parameters
                const paypalPayerId = searchParams.get('PayerID');
                const paypalToken = searchParams.get('token'); // This is the PayPal order ID
                
                // Check for Worldpay parameters  
                const worldpayPaymentId = searchParams.get('paymentId');
                const worldpayTransactionRef = searchParams.get('transactionRef');

                console.log('URL Parameters:', {
                    paypalPayerId,
                    paypalToken, // This is the actual order ID
                    worldpayPaymentId,
                    worldpayTransactionRef
                });

                // Determine which payment provider based on URL parameters
                if (paypalPayerId && paypalToken) {
                    // This is a PayPal return
                    console.log('Processing PayPal payment...');
                    setPaymentProvider('paypal');
                    // Pass the token (which is the order ID) instead of paymentId
                    await handlePayPalSuccess(paypalToken, paypalPayerId, paypalToken);
                } else if (worldpayPaymentId && worldpayTransactionRef) {
                    // This is a Worldpay return
                    console.log('Processing Worldpay payment...');
                    setPaymentProvider('worldpay');
                    await handleWorldpaySuccess(worldpayPaymentId, worldpayTransactionRef);
                } else {
                    // Check if we have pending payment data in localStorage
                    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    if (pendingPayment.provider) {
                        console.log('Found pending payment:', pendingPayment);
                        setPaymentProvider(pendingPayment.provider);
                        setOrderDetails(pendingPayment);
                        setLoading(false);
                        return;
                    }
                    throw new Error('Missing payment information. Please contact support if you completed a payment.');
                }
            } catch (error) {
                console.error('Payment processing error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        const handlePayPalSuccess = async (orderId, payerId, token) => {
            try {
                // Check if we've already processed this payment
                const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
                if (processedPayments.includes(orderId)) {
                    console.log('PayPal payment already processed, showing success page');
                    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    setOrderDetails(pendingPayment);
                    setLoading(false);
                    return;
                }

                // Capture PayPal payment using the correct order ID
                console.log('Capturing PayPal payment with order ID:', orderId);
                const response = await fetch(`http://localhost:5000/capture-paypal-order/${orderId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        payerId: payerId
                    })
                });

                const result = await response.json();
                console.log('PayPal capture result:', result);
                
                if (result.status === 'COMPLETED') {
                    // Payment is completed
                    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    
                    const orderDetailsWithPayment = {
                        ...pendingPayment,
                        orderId: result.orderId || `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        paymentId: result.paymentId || result.id,
                        provider: 'paypal',
                        paymentData: result
                    };
                    
                    setOrderDetails(orderDetailsWithPayment);
                    
                    // Mark this payment as processed
                    const updatedProcessedPayments = [...processedPayments, orderId];
                    localStorage.setItem('processedPayments', JSON.stringify(updatedProcessedPayments));
                    
                    // Clear cart and pending payment
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('pendingPayment');
                    
                    // Trigger cart update event
                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                    
                    console.log('PayPal payment completed successfully!');
                } else {
                    throw new Error(`PayPal payment capture failed: ${result.error || 'Unknown error'}`);
                }
            } catch (error) {
                throw new Error(`PayPal processing failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        const handleWorldpaySuccess = async (paymentId, transactionRef) => {
            try {
                // Check if we've already processed this payment
                const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
                if (processedPayments.includes(paymentId)) {
                    console.log('Worldpay payment already processed, showing success page');
                    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    setOrderDetails(pendingPayment);
                    setLoading(false);
                    return;
                }

                // Verify the payment with Worldpay
                console.log('Verifying Worldpay payment...');
                const response = await fetch(`http://localhost:5000/verify-worldpay-payment/${paymentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        transactionReference: transactionRef,
                        customerInfo: {
                            name: 'John Doe' // In real app, get from form
                        }
                    })
                });

                const result = await response.json();
                console.log('Worldpay verification result:', result);
                
                if (result.success && result.status === 'COMPLETED') {
                    // Payment is completed
                    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    
                    const orderDetailsWithPayment = {
                        ...pendingPayment,
                        orderId: result.orderId,
                        paymentId: result.paymentId,
                        provider: 'worldpay',
                        paymentData: result.paymentData,
                        transactionReference: transactionRef
                    };
                    
                    setOrderDetails(orderDetailsWithPayment);
                    
                    // Mark this payment as processed
                    const updatedProcessedPayments = [...processedPayments, paymentId];
                    localStorage.setItem('processedPayments', JSON.stringify(updatedProcessedPayments));
                    
                    // Clear cart and pending payment
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('pendingPayment');
                    
                    // Trigger cart update event
                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                    
                    console.log('Worldpay payment completed successfully!');
                } else {
                    throw new Error(`Worldpay payment verification failed: ${result.error || 'Unknown error'}`);
                }
            } catch (error) {
                throw new Error(`Worldpay processing failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        handlePaymentSuccess();
    }, [searchParams]);

    // Get provider display info
    const getProviderInfo = () => {
        switch (paymentProvider) {
            case 'paypal':
                return {
                    name: 'PayPal',
                    badge: 'bg-primary',
                    icon: '💳'
                };
            case 'worldpay':
                return {
                    name: 'Worldpay',
                    badge: 'bg-danger',
                    icon: <CreditCard size={16} />
                };
            default:
                return {
                    name: 'Payment Provider',
                    badge: 'bg-secondary',
                    icon: <CreditCard size={16} />
                };
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="text-center">
                    <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Processing payment...</span>
                    </div>
                    <h4 className="text-success">Verifying your payment...</h4>
                    <p className="text-muted">
                        Please wait while we confirm your payment
                        {paymentProvider && ` with ${paymentProvider === 'paypal' ? 'PayPal' : 'Worldpay'}`}.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <AlertCircle size={64} className="text-danger mb-3" />
                                    <h2 className="text-danger mb-3">Payment Error</h2>
                                    <p className="text-muted mb-4">
                                        There was an issue processing your payment: {error}
                                    </p>
                                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                        <button 
                                            className="btn btn-warning"
                                            onClick={() => navigate('/cart')}
                                        >
                                            Back to Cart
                                        </button>
                                        <button 
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate('/')}
                                        >
                                            Back to Home
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const providerInfo = getProviderInfo();

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center py-5">
                                <CheckCircle size={64} className="text-success mb-3" />
                                <h2 className="text-success mb-3">Payment Successful!</h2>
                                <p className="text-muted mb-4">
                                    Thank you for your order. Your payment has been processed successfully 
                                    {paymentProvider && ` via ${providerInfo.name}`} and your number plates are being prepared.
                                </p>

                                {orderDetails && (
                                    <div className="bg-light p-4 rounded mb-4">
                                        <h5 className="mb-3">Order Summary</h5>
                                        <div className="row text-start small">
                                            <div className="col-6">
                                                <strong>Order ID:</strong>
                                            </div>
                                            <div className="col-6">
                                                <code className="small">{orderDetails.orderId}</code>
                                            </div>
                                        </div>
                                        <div className="row text-start small mt-2">
                                            <div className="col-6">
                                                <strong>Total Paid:</strong>
                                            </div>
                                            <div className="col-6">
                                                £{orderDetails.total}
                                            </div>
                                        </div>
                                        {orderDetails.appliedCoupon && (
                                            <div className="row text-start small mt-2">
                                                <div className="col-6">
                                                    <strong>Discount Applied:</strong>
                                                </div>
                                                <div className="col-6 text-success">
                                                    {orderDetails.appliedCoupon.code}
                                                </div>
                                            </div>
                                        )}
                                        <div className="row text-start small mt-2">
                                            <div className="col-6">
                                                <strong>Shipping Method:</strong>
                                            </div>
                                            <div className="col-6">
                                                {orderDetails.shippingOption === 'next-day' ? 'Next Day Delivery' : 
                                                 orderDetails.shippingOption === 'collection' ? 'Collection' : 'Tracked Shipping (Free)'}
                                            </div>
                                        </div>
                                        <div className="row text-start small mt-2">
                                            <div className="col-6">
                                                <strong>Items Ordered:</strong>
                                            </div>
                                            <div className="col-6">
                                                {orderDetails.cartItems?.length || 0} items
                                            </div>
                                        </div>
                                        <div className="row text-start small mt-2">
                                            <div className="col-6">
                                                <strong>Payment Provider:</strong>
                                            </div>
                                            <div className="col-6">
                                                <span className={`badge ${providerInfo.badge}`}>
                                                    {typeof providerInfo.icon === 'string' ? providerInfo.icon : ''} {providerInfo.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row text-start small mt-2">
                                            <div className="col-6">
                                                <strong>Payment ID:</strong>
                                            </div>
                                            <div className="col-6">
                                                <code className="small">{orderDetails.paymentId}</code>
                                            </div>
                                        </div>
                                        {orderDetails.transactionReference && (
                                            <div className="row text-start small mt-2">
                                                <div className="col-6">
                                                    <strong>Transaction Ref:</strong>
                                                </div>
                                                <div className="col-6">
                                                    <code className="small">{orderDetails.transactionReference}</code>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="alert alert-info mb-4">
                                    <strong>What happens next?</strong><br />
                                    <small>
                                        • You'll receive an email confirmation within 5 minutes<br />
                                        • Your plates will be manufactured within 1 business day<br />
                                        • You'll receive tracking information once shipped<br />
                                        • Expected delivery: {orderDetails?.shippingOption === 'next-day' ? 'Tomorrow' : '2-3 business days'}
                                    </small>
                                </div>

                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                    <button 
                                        className="btn btn-warning"
                                        onClick={() => navigate('/plate-builder')}
                                    >
                                        <Package className="me-2" size={16} />
                                        Order More Plates
                                    </button>
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/')}
                                    >
                                        <ArrowRight className="me-2" size={16} />
                                        Back to Home
                                    </button>
                                </div>

                                <div className="mt-4 pt-4 border-top">
                                    <p className="small text-muted mb-0">
                                        Having issues? Contact our support team with your Order ID and Payment ID above.
                                    </p>
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