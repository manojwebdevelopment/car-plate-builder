// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { CheckCircle, Package, ArrowRight, AlertCircle } from 'lucide-react';

// const PaymentSuccessPage = () => {
//     const [searchParams] = useSearchParams();
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handlePaymentSuccess = async () => {
//             try {
//                 const paypalOrderId = searchParams.get('token'); // PayPal returns this as 'token'
//                 const payerId = searchParams.get('PayerID');

//                 console.log('PayPal returned with:', { paypalOrderId, payerId });

//                 if (paypalOrderId && payerId) {
//                     // Capture the payment using your existing endpoint
//                     console.log('Capturing payment...');
//                     const response = await fetch(`http://localhost:5000/capture-paypal-order/${paypalOrderId}`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         }
//                     });

//                     const result = await response.json();
//                     console.log('Capture result:', result);
                    
//                     if (result.status === 'COMPLETED') {
//                         // Get the pending order details from localStorage
//                         const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder') || '{}');
//                         console.log('Pending order details:', pendingOrder);
                        
//                         setOrderDetails(pendingOrder);
                        
//                         // Clear cart and pending order
//                         localStorage.removeItem('cartItems');
//                         localStorage.removeItem('pendingOrder');
                        
//                         // Trigger cart update event
//                         window.dispatchEvent(new CustomEvent('cartUpdated'));
                        
//                         console.log('Payment completed successfully!');
//                     } else {
//                         throw new Error(`Payment status: ${result.status}`);
//                     }
//                 } else {
//                     throw new Error('Missing payment information from PayPal');
//                 }
//             } catch (error) {
//                 console.error('Payment processing error:', error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         handlePaymentSuccess();
//     }, [searchParams]);

//     if (loading) {
//         return (
//             <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
//                 <div className="text-center">
//                     <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
//                         <span className="visually-hidden">Processing payment...</span>
//                     </div>
//                     <h4 className="text-success">Processing your payment...</h4>
//                     <p className="text-muted">Please wait while we confirm your payment with PayPal.</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
//                 <div className="container">
//                     <div className="row justify-content-center">
//                         <div className="col-md-8 col-lg-6">
//                             <div className="card border-0 shadow-sm">
//                                 <div className="card-body text-center py-5">
//                                     <AlertCircle size={64} className="text-danger mb-3" />
//                                     <h2 className="text-danger mb-3">Payment Error</h2>
//                                     <p className="text-muted mb-4">
//                                         There was an issue processing your payment: {error}
//                                     </p>
//                                     <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
//                                         <button 
//                                             className="btn btn-warning"
//                                             onClick={() => navigate('/cart')}
//                                         >
//                                             Back to Cart
//                                         </button>
//                                         <button 
//                                             className="btn btn-outline-secondary"
//                                             onClick={() => navigate('/')}
//                                         >
//                                             Back to Home
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
//             <div className="container py-5">
//                 <div className="row justify-content-center">
//                     <div className="col-md-8 col-lg-6">
//                         <div className="card border-0 shadow-sm">
//                             <div className="card-body text-center py-5">
//                                 <CheckCircle size={64} className="text-success mb-3" />
//                                 <h2 className="text-success mb-3">Payment Successful!</h2>
//                                 <p className="text-muted mb-4">
//                                     Thank you for your order. Your payment has been processed successfully and your number plates are being prepared.
//                                 </p>

//                                 {orderDetails && (
//                                     <div className="bg-light p-4 rounded mb-4">
//                                         <h5 className="mb-3">Order Summary</h5>
//                                         <div className="row text-start small">
//                                             <div className="col-6">
//                                                 <strong>Total Paid:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 £{orderDetails.total}
//                                             </div>
//                                         </div>
//                                         {orderDetails.appliedCoupon && (
//                                             <div className="row text-start small mt-2">
//                                                 <div className="col-6">
//                                                     <strong>Discount Applied:</strong>
//                                                 </div>
//                                                 <div className="col-6 text-success">
//                                                     {orderDetails.appliedCoupon.code}
//                                                 </div>
//                                             </div>
//                                         )}
//                                         <div className="row text-start small mt-2">
//                                             <div className="col-6">
//                                                 <strong>Shipping Method:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 {orderDetails.shippingOption === 'next-day' ? 'Next Day Delivery' : 
//                                                  orderDetails.shippingOption === 'collection' ? 'Collection' : 'Tracked Shipping (Free)'}
//                                             </div>
//                                         </div>
//                                         <div className="row text-start small mt-2">
//                                             <div className="col-6">
//                                                 <strong>Items Ordered:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 {orderDetails.cartItems?.length || 0} items
//                                             </div>
//                                         </div>
//                                         <div className="row text-start small mt-2">
//                                             <div className="col-6">
//                                                 <strong>PayPal Order ID:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <code className="small">{orderDetails.paypalOrderId}</code>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div className="alert alert-info mb-4">
//                                     <strong>What happens next?</strong><br />
//                                     <small>
//                                         • You'll receive an email confirmation within 5 minutes<br />
//                                         • Your plates will be manufactured within 1 business day<br />
//                                         • You'll receive tracking information once shipped<br />
//                                         • Expected delivery: {orderDetails?.shippingOption === 'next-day' ? 'Tomorrow' : '2-3 business days'}
//                                     </small>
//                                 </div>

//                                 <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
//                                     <button 
//                                         className="btn btn-warning"
//                                         onClick={() => navigate('/plate-builder')}
//                                     >
//                                         <Package className="me-2" size={16} />
//                                         Order More Plates
//                                     </button>
//                                     <button 
//                                         className="btn btn-outline-secondary"
//                                         onClick={() => navigate('/')}
//                                     >
//                                         <ArrowRight className="me-2" size={16} />
//                                         Back to Home
//                                     </button>
//                                 </div>

//                                 <div className="mt-4 pt-4 border-top">
//                                     <p className="small text-muted mb-0">
//                                         Having issues? Contact our support team with your PayPal Order ID above.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentSuccessPage;

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, AlertCircle } from 'lucide-react';

const WorldpayPaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const hasProcessed = useRef(false); // Prevent double processing

    useEffect(() => {
        // Prevent multiple executions
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const handlePaymentSuccess = async () => {
            try {
                const paymentId = searchParams.get('paymentId');
                const transactionRef = searchParams.get('transactionRef');

                console.log('Worldpay returned with:', { paymentId, transactionRef });

                if (paymentId && transactionRef) {
                    // Check if we've already processed this payment
                    const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
                    if (processedPayments.includes(paymentId)) {
                        console.log('Payment already processed, showing success page');
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
                        
                        // Get the pending payment details from localStorage
                        const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                        console.log('Pending payment details:', pendingPayment);
                        
                        // Add Worldpay specific data
                        const orderDetailsWithPayment = {
                            ...pendingPayment,
                            orderId: result.orderId,
                            paymentId: result.paymentId,
                            provider: 'worldpay',
                            paymentData: result.paymentData
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
                        throw new Error(`Payment verification failed: ${result.error || 'Unknown error'}`);
                    }
                } else {
                    throw new Error('Missing payment information from Worldpay');
                }
            } catch (error) {
                console.error('Payment processing error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        handlePaymentSuccess();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="text-center">
                    <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Processing payment...</span>
                    </div>
                    <h4 className="text-success">Verifying your payment...</h4>
                    <p className="text-muted">Please wait while we confirm your payment with Worldpay.</p>
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
                                    Thank you for your order. Your payment has been processed successfully via Worldpay and your number plates are being prepared.
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
                                                <span className="badge bg-primary">Worldpay</span>
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
                                        <div className="row text-start small mt-2">
                                            <div className="col-6">
                                                <strong>Transaction Ref:</strong>
                                            </div>
                                            <div className="col-6">
                                                <code className="small">{orderDetails.transactionReference}</code>
                                            </div>
                                        </div>
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

export default WorldpayPaymentSuccessPage;