// import React, { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { CheckCircle, Package, ArrowRight, AlertCircle, CreditCard } from 'lucide-react';

// const UnifiedPaymentSuccessPage = () => {
//     const [searchParams] = useSearchParams();
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [paymentProvider, setPaymentProvider] = useState(null);
//     const navigate = useNavigate();
//     const hasProcessed = useRef(false); // Prevent double processing

//     useEffect(() => {
//         // Prevent multiple executions
//         if (hasProcessed.current) return;
//         hasProcessed.current = true;

//         const handlePaymentSuccess = async () => {
//             try {
//                 // Check for PayPal parameters
//                 const paypalPayerId = searchParams.get('PayerID');
//                 const paypalToken = searchParams.get('token'); // This is the PayPal order ID
                
//                 // Check for Worldpay parameters  
//                 const worldpayPaymentId = searchParams.get('paymentId');
//                 const worldpayTransactionRef = searchParams.get('transactionRef');

//                 console.log('URL Parameters:', {
//                     paypalPayerId,
//                     paypalToken, // This is the actual order ID
//                     worldpayPaymentId,
//                     worldpayTransactionRef
//                 });

//                 // Determine which payment provider based on URL parameters
//                 if (paypalPayerId && paypalToken) {
//                     // This is a PayPal return
//                     console.log('Processing PayPal payment...');
//                     setPaymentProvider('paypal');
//                     // Pass the token (which is the order ID) instead of paymentId
//                     await handlePayPalSuccess(paypalToken, paypalPayerId, paypalToken);
//                 } else if (worldpayPaymentId && worldpayTransactionRef) {
//                     // This is a Worldpay return
//                     console.log('Processing Worldpay payment...');
//                     setPaymentProvider('worldpay');
//                     await handleWorldpaySuccess(worldpayPaymentId, worldpayTransactionRef);
//                 } else {
//                     // Check if we have pending payment data in localStorage
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
//                     if (pendingPayment.provider) {
//                         console.log('Found pending payment:', pendingPayment);
//                         setPaymentProvider(pendingPayment.provider);
//                         setOrderDetails(pendingPayment);
//                         setLoading(false);
//                         return;
//                     }
//                     throw new Error('Missing payment information. Please contact support if you completed a payment.');
//                 }
//             } catch (error) {
//                 console.error('Payment processing error:', error);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         const handlePayPalSuccess = async (orderId, payerId, token) => {
//             try {
//                 // Check if we've already processed this payment
//                 const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
//                 if (processedPayments.includes(orderId)) {
//                     console.log('PayPal payment already processed, showing success page');
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
//                     setOrderDetails(pendingPayment);
//                     setLoading(false);
//                     return;
//                 }

//                 // Capture PayPal payment using the correct order ID
//                 console.log('Capturing PayPal payment with order ID:', orderId);
//                 const response = await fetch(`http://localhost:5000/capture-paypal-order/${orderId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         payerId: payerId
//                     })
//                 });

//                 const result = await response.json();
//                 console.log('PayPal capture result:', result);
                
//                 if (result.status === 'COMPLETED') {
//                     // Payment is completed
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    
//                     const orderDetailsWithPayment = {
//                         ...pendingPayment,
//                         orderId: result.orderId || `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//                         paymentId: result.paymentId || result.id,
//                         provider: 'paypal',
//                         paymentData: result
//                     };
                    
//                     setOrderDetails(orderDetailsWithPayment);
                    
//                     // Mark this payment as processed
//                     const updatedProcessedPayments = [...processedPayments, orderId];
//                     localStorage.setItem('processedPayments', JSON.stringify(updatedProcessedPayments));
                    
//                     // Clear cart and pending payment
//                     localStorage.removeItem('cartItems');
//                     localStorage.removeItem('pendingPayment');
                    
//                     // Trigger cart update event
//                     window.dispatchEvent(new CustomEvent('cartUpdated'));
                    
//                     console.log('PayPal payment completed successfully!');
//                 } else {
//                     throw new Error(`PayPal payment capture failed: ${result.error || 'Unknown error'}`);
//                 }
//             } catch (error) {
//                 throw new Error(`PayPal processing failed: ${error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const handleWorldpaySuccess = async (paymentId, transactionRef) => {
//             try {
//                 // Check if we've already processed this payment
//                 const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
//                 if (processedPayments.includes(paymentId)) {
//                     console.log('Worldpay payment already processed, showing success page');
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
//                     setOrderDetails(pendingPayment);
//                     setLoading(false);
//                     return;
//                 }

//                 // Verify the payment with Worldpay
//                 console.log('Verifying Worldpay payment...');
//                 const response = await fetch(`http://localhost:5000/verify-worldpay-payment/${paymentId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         transactionReference: transactionRef,
//                         customerInfo: {
//                             name: 'John Doe' // In real app, get from form
//                         }
//                     })
//                 });

//                 const result = await response.json();
//                 console.log('Worldpay verification result:', result);
                
//                 if (result.success && result.status === 'COMPLETED') {
//                     // Payment is completed
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    
//                     const orderDetailsWithPayment = {
//                         ...pendingPayment,
//                         orderId: result.orderId,
//                         paymentId: result.paymentId,
//                         provider: 'worldpay',
//                         paymentData: result.paymentData,
//                         transactionReference: transactionRef
//                     };
                    
//                     setOrderDetails(orderDetailsWithPayment);
                    
//                     // Mark this payment as processed
//                     const updatedProcessedPayments = [...processedPayments, paymentId];
//                     localStorage.setItem('processedPayments', JSON.stringify(updatedProcessedPayments));
                    
//                     // Clear cart and pending payment
//                     localStorage.removeItem('cartItems');
//                     localStorage.removeItem('pendingPayment');
                    
//                     // Trigger cart update event
//                     window.dispatchEvent(new CustomEvent('cartUpdated'));
                    
//                     console.log('Worldpay payment completed successfully!');
//                 } else {
//                     throw new Error(`Worldpay payment verification failed: ${result.error || 'Unknown error'}`);
//                 }
//             } catch (error) {
//                 throw new Error(`Worldpay processing failed: ${error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         handlePaymentSuccess();
//     }, [searchParams]);

//     // Get provider display info
//     const getProviderInfo = () => {
//         switch (paymentProvider) {
//             case 'paypal':
//                 return {
//                     name: 'PayPal',
//                     badge: 'bg-primary',
//                     icon: '💳'
//                 };
//             case 'worldpay':
//                 return {
//                     name: 'Worldpay',
//                     badge: 'bg-danger',
//                     icon: <CreditCard size={16} />
//                 };
//             default:
//                 return {
//                     name: 'Payment Provider',
//                     badge: 'bg-secondary',
//                     icon: <CreditCard size={16} />
//                 };
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
//                 <div className="text-center">
//                     <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
//                         <span className="visually-hidden">Processing payment...</span>
//                     </div>
//                     <h4 className="text-success">Verifying your payment...</h4>
//                     <p className="text-muted">
//                         Please wait while we confirm your payment
//                         {paymentProvider && ` with ${paymentProvider === 'paypal' ? 'PayPal' : 'Worldpay'}`}.
//                     </p>
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

//     const providerInfo = getProviderInfo();

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
//                                     Thank you for your order. Your payment has been processed successfully 
//                                     {paymentProvider && ` via ${providerInfo.name}`} and your number plates are being prepared.
//                                 </p>

//                                 {orderDetails && (
//                                     <div className="bg-light p-4 rounded mb-4">
//                                         <h5 className="mb-3">Order Summary</h5>
//                                         <div className="row text-start small">
//                                             <div className="col-6">
//                                                 <strong>Order ID:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <code className="small">{orderDetails.orderId}</code>
//                                             </div>
//                                         </div>
//                                         <div className="row text-start small mt-2">
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
//                                                 <strong>Payment Provider:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <span className={`badge ${providerInfo.badge}`}>
//                                                     {typeof providerInfo.icon === 'string' ? providerInfo.icon : ''} {providerInfo.name}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="row text-start small mt-2">
//                                             <div className="col-6">
//                                                 <strong>Payment ID:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <code className="small">{orderDetails.paymentId}</code>
//                                             </div>
//                                         </div>
//                                         {orderDetails.transactionReference && (
//                                             <div className="row text-start small mt-2">
//                                                 <div className="col-6">
//                                                     <strong>Transaction Ref:</strong>
//                                                 </div>
//                                                 <div className="col-6">
//                                                     <code className="small">{orderDetails.transactionReference}</code>
//                                                 </div>
//                                             </div>
//                                         )}
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
//                                         Having issues? Contact our support team with your Order ID and Payment ID above.
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

// export default UnifiedPaymentSuccessPage;

// // Debug version of PaymentSuccessPage - Replace your current version

// // import React, { useEffect, useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { useCart } from '../../context/CartContext';

// // const UnifiedPaymentSuccessPage = () => {
// //   const [orderDetails, setOrderDetails] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [debugInfo, setDebugInfo] = useState({}); // DEBUG: Add debug info state
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { cart, clearCart } = useCart();

// //   // Fix: Use import.meta.env instead of process.env for Vite
// //   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(location.search);
    
// //     // DEBUG: Log URL parameters
// //     console.log('=== PAYMENT SUCCESS DEBUG ===');
// //     console.log('URL:', location.href);
// //     console.log('URL Params:', Object.fromEntries(urlParams.entries()));
    
// //     const paypalToken = urlParams.get('token');
// //     const paypalPayerId = urlParams.get('PayerID');
// //     const worldpayPaymentId = urlParams.get('paymentId');
// //     const worldpayTransactionRef = urlParams.get('transactionRef');

// //     setDebugInfo({
// //       url: location.href,
// //       params: Object.fromEntries(urlParams.entries()),
// //       paypalToken,
// //       paypalPayerId,
// //       cartLength: cart?.length || 0,
// //       apiUrl: API_URL
// //     });

// //     if (paypalToken && paypalPayerId) {
// //       handlePayPalSuccess(paypalToken, paypalPayerId);
// //     } else if (worldpayPaymentId) {
// //       handleWorldpaySuccess(worldpayPaymentId, worldpayTransactionRef);
// //     } else {
// //       setError('Invalid payment parameters');
// //       setLoading(false);
// //     }
// //   }, [location]);

// //   const getSessionId = () => {
// //     let sessionId = localStorage.getItem('sessionId');
// //     if (!sessionId) {
// //       sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// //       localStorage.setItem('sessionId', sessionId);
// //     }
// //     return sessionId;
// //   };

// //   const prepareCartDataForBackend = () => {
// //     console.log('=== CART DATA PREPARATION ===');
// //     console.log('Cart from context:', cart);
    
// //     // Try multiple sources for cart data
// //     const sources = [
// //       { name: 'React Context', data: cart },
// //       { name: 'localStorage', data: localStorage.getItem('cart') },
// //       { name: 'sessionStorage', data: sessionStorage.getItem('cart') },
// //       { name: 'lastOrderData', data: localStorage.getItem('lastOrderData') }
// //     ];

// //     for (const source of sources) {
// //       console.log(`${source.name}:`, source.data);
// //     }

// //     // First try: Use cart from context
// //     if (cart && cart.length > 0) {
// //       console.log('✅ Using cart from context');
// //       return mapCartItemsToBackendFormat(cart);
// //     }
    
// //     // Second try: Get cart from localStorage
// //     const storedCart = localStorage.getItem('cart');
// //     if (storedCart) {
// //       try {
// //         const parsedCart = JSON.parse(storedCart);
// //         if (parsedCart && parsedCart.length > 0) {
// //           console.log('✅ Using cart from localStorage');
// //           return mapCartItemsToBackendFormat(parsedCart);
// //         }
// //       } catch (e) {
// //         console.error('Error parsing stored cart:', e);
// //       }
// //     }

// //     console.warn('⚠️ No cart data available - creating fallback');
    
// //     // Fallback: Create a basic order item
// //     const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
// //     const pricingInfo = JSON.parse(localStorage.getItem('pricingInfo') || '{}');
    
// //     return [{
// //       name: 'Custom Number Plate',
// //       type: 'plate',
// //       price: pricingInfo.total || 25.00,
// //       quantity: 1,
// //       subtotal: pricingInfo.total || 25.00,
// //       registration: 'UNKNOWN',
// //       side: 'front',
// //       roadLegal: 'No',
// //       spacing: 'legal',
// //       plateStyle: 'standard',
// //       styleLabel: 'Standard Plate',
// //       fontColor: '#000000',
// //       fontColorName: 'Black',
// //       borderStyle: 'none',
// //       borderName: 'No Border',
// //       size: 'standard',
// //       sizeLabel: 'Standard Size'
// //     }];
// //   };

// //   const mapCartItemsToBackendFormat = (items) => {
// //     return items.map(item => ({
// //       name: item.name || `${item.registration || 'Custom'} Number Plate`,
// //       type: item.type || 'plate',
// //       price: item.price || 0,
// //       quantity: item.quantity || 1,
// //       subtotal: item.subtotal || (item.price * item.quantity),
// //       registration: item.registration || item.text || 'UNKNOWN',
// //       side: item.side || 'front',
// //       roadLegal: item.roadLegal || 'No',
// //       spacing: item.spacing || 'legal',
// //       plateStyle: item.plateStyle || 'standard',
// //       styleLabel: item.styleLabel || 'Standard Plate',
// //       stylePrice: item.stylePrice || 0,
// //       size: item.size || 'standard',
// //       sizeLabel: item.sizeLabel || 'Standard Size',
// //       sizeDimensions: item.sizeDimensions || '520mm x 111mm',
// //       sizePrice: item.sizePrice || 0,
// //       fontColor: item.fontColor || '#000000',
// //       fontColorName: item.fontColorName || 'Black',
// //       fontColorPrice: item.fontColorPrice || 0,
// //       borderStyle: item.borderStyle || 'none',
// //       borderName: item.borderName || 'No Border',
// //       borderType: item.borderType || 'none',
// //       borderColor: item.borderColor || '',
// //       borderWidth: item.borderWidth || 0,
// //       borderPrice: item.borderPrice || 0,
// //       countryBadge: item.countryBadge || 'none',
// //       selectedCountry: item.selectedCountry || 'uk',
// //       badgeName: item.badgeName || 'No Badge',
// //       badgePosition: item.badgePosition || 'left',
// //       flagImage: item.flagImage || '',
// //       badgePrice: item.badgePrice || 0,
// //       finish: item.finish || 'standard',
// //       finishLabel: item.finishLabel || 'Standard Finish',
// //       finishDescription: item.finishDescription || '',
// //       finishPrice: item.finishPrice || 0,
// //       thickness: item.thickness || '3mm',
// //       thicknessLabel: item.thicknessLabel || '3mm Standard',
// //       thicknessValue: item.thicknessValue || 3,
// //       thicknessPrice: item.thicknessPrice || 0,
// //       shadowEffect: item.shadowEffect || 'none',
// //       shadowName: item.shadowName || 'No Effect',
// //       shadowDescription: item.shadowDescription || '',
// //       shadowPrice: item.shadowPrice || 0,
// //       displayText: item.displayText || item.registration || item.text,
// //       font: item.font || 'Charles Wright',
// //       fontSize: item.fontSize || 79
// //     }));
// //   };

// //   const handlePayPalSuccess = async (token, payerId) => {
// //     try {
// //       console.log('=== PAYPAL PROCESSING ===');
// //       console.log('Token:', token);
// //       console.log('PayerID:', payerId);
      
// //       const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
// //       const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
// //       const pricingInfo = JSON.parse(localStorage.getItem('pricingInfo') || '{}');
      
// //       console.log('Customer Info:', customerInfo);
// //       console.log('Shipping Address:', shippingAddress);
// //       console.log('Pricing Info:', pricingInfo);
      
// //       const cartItems = prepareCartDataForBackend();
// //       console.log('Cart Items to Send:', cartItems);

// //       const requestBody = {
// //         payerId,
// //         sessionId: getSessionId(),
// //         customerInfo: {
// //           name: customerInfo.name || shippingAddress.name || 'Customer',
// //           email: customerInfo.email || 'customer@example.com',
// //           phone: customerInfo.phone || shippingAddress.phone || ''
// //         },
// //         shippingAddress: {
// //           name: shippingAddress.name || customerInfo.name || 'Customer',
// //           street: shippingAddress.street || shippingAddress.address || 'Not provided',
// //           city: shippingAddress.city || 'Not provided',
// //           state: shippingAddress.state || '',
// //           postcode: shippingAddress.postcode || shippingAddress.zipCode || 'Not provided',
// //           country: shippingAddress.country || 'GB',
// //           phone: shippingAddress.phone || customerInfo.phone || ''
// //         },
// //         pricing: {
// //           subtotal: pricingInfo.subtotal || 0,
// //           discount: pricingInfo.discount || 0,
// //           discountCode: pricingInfo.discountCode || '',
// //           shipping: pricingInfo.shipping || 0,
// //           shippingMethod: pricingInfo.shippingMethod || 'tracked',
// //           tax: pricingInfo.tax || 0,
// //           taxRate: pricingInfo.taxRate || 0.20,
// //           total: pricingInfo.total || cartItems.reduce((sum, item) => sum + item.subtotal, 0)
// //         },
// //         cartItems: cartItems
// //       };

// //       console.log('=== REQUEST BODY ===');
// //       console.log(JSON.stringify(requestBody, null, 2));

// //       const url = `${API_URL}/capture-paypal-order/${token}`;
// //       console.log('=== API REQUEST ===');
// //       console.log('URL:', url);

// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(requestBody),
// //       });

// //       console.log('=== RESPONSE STATUS ===');
// //       console.log('Status:', response.status);
// //       console.log('Status Text:', response.statusText);

// //       const result = await response.json();
// //       console.log('=== RESPONSE DATA ===');
// //       console.log(JSON.stringify(result, null, 2));

// //       // Update debug info
// //       setDebugInfo(prev => ({
// //         ...prev,
// //         requestBody,
// //         responseStatus: response.status,
// //         responseData: result
// //       }));

// //       if (result.success) {
// //         setOrderDetails({
// //           orderId: result.orderId,
// //           paymentId: result.paymentId,
// //           amount: result.amount,
// //           currency: result.currency || 'GBP',
// //           provider: 'PayPal',
// //           status: 'Success',
// //           items: cartItems.length
// //         });
        
// //         // Clear cart and stored data
// //         clearCart();
// //         localStorage.removeItem('customerInfo');
// //         localStorage.removeItem('shippingAddress');
// //         localStorage.removeItem('pricingInfo');
// //         localStorage.removeItem('cart');
// //         sessionStorage.removeItem('cart');
        
// //         console.log('✅ Order processed successfully');
// //       } else {
// //         console.error('❌ Backend returned error:', result.error);
// //         setError(result.error || 'Payment verification failed');
// //       }
// //     } catch (error) {
// //       console.error('❌ Request failed:', error);
// //       setError('Failed to process payment verification');
      
// //       // Update debug info with error
// //       setDebugInfo(prev => ({
// //         ...prev,
// //         error: error.message,
// //         stack: error.stack
// //       }));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleWorldpaySuccess = async (paymentId, transactionRef) => {
// //     // Similar implementation for Worldpay
// //     setLoading(false);
// //     setError('Worldpay processing not implemented in debug version');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
// //         <div className="text-center">
// //           <div className="spinner-border text-warning mb-3" style={{ width: '3rem', height: '3rem' }}>
// //             <span className="visually-hidden">Loading...</span>
// //           </div>
// //           <h4 className="text-dark">Processing your payment...</h4>
// //           <p className="text-muted">Please wait while we verify your order</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
// //         <div className="text-center">
// //           <div className="alert alert-danger" style={{ maxWidth: '800px' }}>
// //             <h4 className="alert-heading">
// //               <i className="bi bi-exclamation-triangle me-2"></i>
// //               Payment Error
// //             </h4>
// //             <p>{error}</p>
            
// //             {/* DEBUG: Show debug information */}
// //             <details className="mt-3">
// //               <summary className="btn btn-outline-secondary btn-sm">Show Debug Info</summary>
// //               <pre className="mt-2 text-start small bg-light p-2 rounded">
// //                 {JSON.stringify(debugInfo, null, 2)}
// //               </pre>
// //             </details>
            
// //             <hr />
// //             <button className="btn btn-outline-danger" onClick={() => navigate('/basket')}>
// //               Return to Cart
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
// //       <div className="text-center">
// //         <div className="card shadow-lg border-0" style={{ maxWidth: '800px' }}>
// //           <div className="card-header bg-success text-white text-center py-4">
// //             <div className="mb-3">
// //               <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }}></i>
// //             </div>
// //             <h2 className="mb-0">Payment Successful!</h2>
// //           </div>
// //           <div className="card-body p-4">
// //             {orderDetails ? (
// //               <>
// //                 <div className="alert alert-success">
// //                   <h5 className="alert-heading">
// //                     <i className="bi bi-receipt me-2"></i>
// //                     Order Confirmed
// //                   </h5>
// //                   <p className="mb-0">Your number plate order has been successfully processed and stored with complete configuration details.</p>
// //                 </div>
                
// //                 <div className="row text-start">
// //                   <div className="col-md-6">
// //                     <h6 className="fw-bold text-warning">Order Information</h6>
// //                     <p><strong>Order ID:</strong><br />
// //                     <span className="font-monospace small">{orderDetails.orderId || 'Not provided'}</span></p>
// //                     <p><strong>Payment Method:</strong><br />
// //                     <span className="badge bg-primary">{orderDetails.provider || 'Unknown'}</span></p>
// //                     <p><strong>Items:</strong><br />
// //                     {orderDetails.items || 0} plate(s) ordered</p>
// //                   </div>
// //                   <div className="col-md-6">
// //                     <h6 className="fw-bold text-warning">Payment Details</h6>
// //                     <p><strong>Amount Paid:</strong><br />
// //                     <span className="h5 text-success">£{orderDetails.amount || '0.00'} {orderDetails.currency || 'GBP'}</span></p>
// //                     <p><strong>Transaction ID:</strong><br />
// //                     <span className="font-monospace small">{orderDetails.paymentId || 'Not provided'}</span></p>
// //                     <p><strong>Status:</strong><br />
// //                     <span className="badge bg-success">{orderDetails.status || 'Unknown'}</span></p>
// //                   </div>
// //                 </div>
                
// //                 {/* DEBUG: Show debug information */}
// //                 <details className="mt-3">
// //                   <summary className="btn btn-outline-secondary btn-sm">Show Debug Info</summary>
// //                   <pre className="mt-2 text-start small bg-light p-2 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
// //                     {JSON.stringify(debugInfo, null, 2)}
// //                   </pre>
// //                 </details>
                
// //                 <div className="alert alert-info mt-3">
// //                   <h6><i className="bi bi-info-circle me-2"></i>What happens next?</h6>
// //                   <ul className="mb-0 small">
// //                     <li>Your order details have been saved with complete plate configurations</li>
// //                     <li>You will receive an email confirmation shortly</li>
// //                     <li>Our team will begin processing your custom plates</li>
// //                     <li>You can track your order status in your account</li>
// //                   </ul>
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="alert alert-warning">
// //                 <h5 className="alert-heading">Order Processing Issue</h5>
// //                 <p>Payment was successful but order details are missing.</p>
                
// //                 {/* DEBUG: Show debug information */}
// //                 <details className="mt-3">
// //                   <summary className="btn btn-outline-secondary btn-sm">Show Debug Info</summary>
// //                   <pre className="mt-2 text-start small bg-light p-2 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
// //                     {JSON.stringify(debugInfo, null, 2)}
// //                   </pre>
// //                 </details>
// //               </div>
// //             )}
            
// //             <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
// //               <button 
// //                 className="btn btn-warning btn-lg me-md-2" 
// //                 onClick={() => navigate('/')}
// //               >
// //                 <i className="bi bi-house me-2"></i>
// //                 Continue Shopping
// //               </button>
// //               <button 
// //                 className="btn btn-outline-primary btn-lg" 
// //                 onClick={() => window.print()}
// //               >
// //                 <i className="bi bi-printer me-2"></i>
// //                 Print Receipt
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };




// // export default UnifiedPaymentSuccessPage;




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
            // Load jsPDF library if not already loaded
            if (!window.jspdf) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            
            // Wait for library to initialize
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('portrait', 'mm', 'a4');
            
            // Set up fonts and colors
            doc.setFont('helvetica');
            
            // Header
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('PlateForge', 105, 30, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Premium Number Plates', 105, 40, { align: 'center' });
            doc.text('Tax Invoice/Receipt', 105, 48, { align: 'center' });
            
            // Header line
            doc.setLineWidth(0.5);
            doc.line(20, 55, 190, 55);
            
            // Order Information Section
            let yPos = 70;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Order Information', 20, yPos);
            
            yPos += 8;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Order ID: ${orderData?.orderId || 'N/A'}`, 20, yPos);
            
            yPos += 6;
            doc.text(`Order Date: ${new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`, 20, yPos);
            
            yPos += 6;
            doc.text('Payment Method: PayPal', 20, yPos);
            
            yPos += 6;
            doc.text('Status: Confirmed', 20, yPos);
            
            // Payment Details Section (Right side)
            let yPos2 = 70;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Payment Details', 110, yPos2);
            
            yPos2 += 8;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Amount Paid: £${orderData?.amount || '0.00'}`, 110, yPos2);
            
            yPos2 += 6;
            doc.text(`Currency: ${orderData?.currency || 'GBP'}`, 110, yPos2);
            
            yPos2 += 6;
            doc.text(`Transaction ID: ${orderData?.paymentId || 'N/A'}`, 110, yPos2);
            
            yPos2 += 6;
            doc.text('Payment Status: Paid', 110, yPos2);
            
            // Order Items Section
            yPos = Math.max(yPos, yPos2) + 20;
            
            // Items box
            doc.setDrawColor(200, 200, 200);
            doc.setFillColor(248, 249, 250);
            doc.rect(20, yPos, 170, 8, 'FD');
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Order Items', 22, yPos + 5);
            
            yPos += 8;
            doc.setDrawColor(200, 200, 200);
            doc.rect(20, yPos, 170, 15, 'S');
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('Custom Number Plate', 22, yPos + 6);
            
            doc.setFont('helvetica', 'normal');
            doc.text('Personalized design • High quality materials • Professional finish', 22, yPos + 12);
            
            doc.setFont('helvetica', 'bold');
            doc.text(`£${orderData?.amount || '0.00'}`, 180, yPos + 9, { align: 'right' });
            
            // Totals Section
            yPos += 25;
            doc.setLineWidth(0.5);
            doc.line(20, yPos, 190, yPos);
            
            yPos += 10;
            const subtotal = ((orderData?.amount || 0) / 1.18).toFixed(2);
            const vat = ((orderData?.amount || 0) * 0.18 / 1.18).toFixed(2);
            
            doc.setFont('helvetica', 'normal');
            doc.text('Subtotal:', 130, yPos);
            doc.text(`£${subtotal}`, 180, yPos, { align: 'right' });
            
            yPos += 6;
            doc.text('VAT (18%):', 130, yPos);
            doc.text(`£${vat}`, 180, yPos, { align: 'right' });
            
            yPos += 6;
            doc.text('Shipping:', 130, yPos);
            doc.text('Free', 180, yPos, { align: 'right' });
            
            yPos += 8;
            doc.setLineWidth(0.3);
            doc.line(130, yPos, 190, yPos);
            
            yPos += 6;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Total Amount:', 130, yPos);
            doc.text(`£${orderData?.amount || '0.00'}`, 180, yPos, { align: 'right' });
            
            // Footer Section
            yPos += 20;
            doc.setLineWidth(0.3);
            doc.line(20, yPos, 190, yPos);
            
            yPos += 10;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Thank you for your order!', 105, yPos, { align: 'center' });
            
            yPos += 8;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Your custom number plates will be manufactured within 3-5 business days.', 105, yPos, { align: 'center' });
            
            yPos += 6;
            doc.text('You will receive tracking information once your order has been shipped.', 105, yPos, { align: 'center' });
            
            yPos += 6;
            doc.text('Estimated delivery: 5-7 business days', 105, yPos, { align: 'center' });
            
            // Company info
            yPos += 15;
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('PlateForge Ltd | London, UK | www.plateforge.com', 105, yPos, { align: 'center' });
            
            yPos += 4;
            doc.text('For support, contact us at info@plateforge.com', 105, yPos, { align: 'center' });
            
            yPos += 4;
            doc.text(`Order ID: ${orderData?.orderId} | Transaction: ${orderData?.paymentId}`, 105, yPos, { align: 'center' });
            
            // Save the PDF
            doc.save(`PlateForge-Receipt-${orderData?.displayOrderNumber || 'Order'}.pdf`);
            
            showToast('PDF receipt downloaded successfully! 📄', 'success');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            showToast('Failed to generate PDF receipt. Please try again.', 'error');
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



// import React, { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { CheckCircle, Package, ArrowRight, AlertCircle, CreditCard } from 'lucide-react';

// const UnifiedPaymentSuccessPage = () => {
//     const [searchParams] = useSearchParams();
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [paymentProvider, setPaymentProvider] = useState(null);
//     const navigate = useNavigate();
//     const hasProcessed = useRef(false); // Prevent double processing

//     useEffect(() => {
//         // Prevent multiple executions
//         if (hasProcessed.current) return;
//         hasProcessed.current = true;

//         const handlePaymentSuccess = async () => {
//             try {
//                 // Check for PayPal parameters
//                 const paypalPayerId = searchParams.get('PayerID');
//                 const paypalToken = searchParams.get('token'); // This is the PayPal order ID
                
//                 // Check for Worldpay parameters  
//                 const worldpayPaymentId = searchParams.get('paymentId');
//                 const worldpayTransactionRef = searchParams.get('transactionRef');

//                 console.log('URL Parameters:', {
//                     paypalPayerId,
//                     paypalToken, // This is the actual order ID
//                     worldpayPaymentId,
//                     worldpayTransactionRef
//                 });

//                 // Determine which payment provider based on URL parameters
//                 if (paypalPayerId && paypalToken) {
//                     // This is a PayPal return
//                     console.log('Processing PayPal payment...');
//                     setPaymentProvider('paypal');
//                     // Pass the token (which is the order ID) instead of paymentId
//                     await handlePayPalSuccess(paypalToken, paypalPayerId, paypalToken);
//                 } else if (worldpayPaymentId && worldpayTransactionRef) {
//                     // This is a Worldpay return
//                     console.log('Processing Worldpay payment...');
//                     setPaymentProvider('worldpay');
//                     await handleWorldpaySuccess(worldpayPaymentId, worldpayTransactionRef);
//                 } else {
//                     // Check if we have pending payment data in localStorage
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
//                     if (pendingPayment.provider) {
//                         console.log('Found pending payment:', pendingPayment);
//                         setPaymentProvider(pendingPayment.provider);
//                         setOrderDetails(pendingPayment);
//                         setLoading(false);
//                         return;
//                     }
//                     throw new Error('Missing payment information. Please contact support if you completed a payment.');
//                 }
//             } catch (error) {
//                 console.error('Payment processing error:', error);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         const handlePayPalSuccess = async (orderId, payerId, token) => {
//             try {
//                 // Check if we've already processed this payment
//                 const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
//                 if (processedPayments.includes(orderId)) {
//                     console.log('PayPal payment already processed, showing success page');
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
//                     setOrderDetails(pendingPayment);
//                     setLoading(false);
//                     return;
//                 }

//                 // Capture PayPal payment using the correct order ID
//                 console.log('Capturing PayPal payment with order ID:', orderId);
//                 const response = await fetch(`http://localhost:5000/capture-paypal-order/${orderId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         payerId: payerId
//                     })
//                 });

//                 const result = await response.json();
//                 console.log('PayPal capture result:', result);
                
//                 if (result.status === 'COMPLETED') {
//                     // Payment is completed
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    
//                     const orderDetailsWithPayment = {
//                         ...pendingPayment,
//                         orderId: result.orderId || `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//                         paymentId: result.paymentId || result.id,
//                         provider: 'paypal',
//                         paymentData: result
//                     };
                    
//                     setOrderDetails(orderDetailsWithPayment);
                    
//                     // Mark this payment as processed
//                     const updatedProcessedPayments = [...processedPayments, orderId];
//                     localStorage.setItem('processedPayments', JSON.stringify(updatedProcessedPayments));
                    
//                     // Clear cart and pending payment
//                     localStorage.removeItem('cartItems');
//                     localStorage.removeItem('pendingPayment');
                    
//                     // Trigger cart update event
//                     window.dispatchEvent(new CustomEvent('cartUpdated'));
                    
//                     console.log('PayPal payment completed successfully!');
//                 } else {
//                     throw new Error(`PayPal payment capture failed: ${result.error || 'Unknown error'}`);
//                 }
//             } catch (error) {
//                 throw new Error(`PayPal processing failed: ${error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const handleWorldpaySuccess = async (paymentId, transactionRef) => {
//             try {
//                 // Check if we've already processed this payment
//                 const processedPayments = JSON.parse(localStorage.getItem('processedPayments') || '[]');
//                 if (processedPayments.includes(paymentId)) {
//                     console.log('Worldpay payment already processed, showing success page');
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
//                     setOrderDetails(pendingPayment);
//                     setLoading(false);
//                     return;
//                 }

//                 // Verify the payment with Worldpay
//                 console.log('Verifying Worldpay payment...');
//                 const response = await fetch(`http://localhost:5000/verify-worldpay-payment/${paymentId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         transactionReference: transactionRef,
//                         customerInfo: {
//                             name: 'John Doe' // In real app, get from form
//                         }
//                     })
//                 });

//                 const result = await response.json();
//                 console.log('Worldpay verification result:', result);
                
//                 if (result.success && result.status === 'COMPLETED') {
//                     // Payment is completed
//                     const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment') || '{}');
                    
//                     const orderDetailsWithPayment = {
//                         ...pendingPayment,
//                         orderId: result.orderId,
//                         paymentId: result.paymentId,
//                         provider: 'worldpay',
//                         paymentData: result.paymentData,
//                         transactionReference: transactionRef
//                     };
                    
//                     setOrderDetails(orderDetailsWithPayment);
                    
//                     // Mark this payment as processed
//                     const updatedProcessedPayments = [...processedPayments, paymentId];
//                     localStorage.setItem('processedPayments', JSON.stringify(updatedProcessedPayments));
                    
//                     // Clear cart and pending payment
//                     localStorage.removeItem('cartItems');
//                     localStorage.removeItem('pendingPayment');
                    
//                     // Trigger cart update event
//                     window.dispatchEvent(new CustomEvent('cartUpdated'));
                    
//                     console.log('Worldpay payment completed successfully!');
//                 } else {
//                     throw new Error(`Worldpay payment verification failed: ${result.error || 'Unknown error'}`);
//                 }
//             } catch (error) {
//                 throw new Error(`Worldpay processing failed: ${error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         handlePaymentSuccess();
//     }, [searchParams]);

//     // Get provider display info
//     const getProviderInfo = () => {
//         switch (paymentProvider) {
//             case 'paypal':
//                 return {
//                     name: 'PayPal',
//                     badge: 'bg-primary',
//                     icon: '💳'
//                 };
//             case 'worldpay':
//                 return {
//                     name: 'Worldpay',
//                     badge: 'bg-danger',
//                     icon: <CreditCard size={16} />
//                 };
//             default:
//                 return {
//                     name: 'Payment Provider',
//                     badge: 'bg-secondary',
//                     icon: <CreditCard size={16} />
//                 };
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
//                 <div className="text-center">
//                     <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
//                         <span className="visually-hidden">Processing payment...</span>
//                     </div>
//                     <h4 className="text-success">Verifying your payment...</h4>
//                     <p className="text-muted">
//                         Please wait while we confirm your payment
//                         {paymentProvider && ` with ${paymentProvider === 'paypal' ? 'PayPal' : 'Worldpay'}`}.
//                     </p>
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

//     const providerInfo = getProviderInfo();

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
//                                     Thank you for your order. Your payment has been processed successfully 
//                                     {paymentProvider && ` via ${providerInfo.name}`} and your number plates are being prepared.
//                                 </p>

//                                 {orderDetails && (
//                                     <div className="bg-light p-4 rounded mb-4">
//                                         <h5 className="mb-3">Order Summary</h5>
//                                         <div className="row text-start small">
//                                             <div className="col-6">
//                                                 <strong>Order ID:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <code className="small">{orderDetails.orderId}</code>
//                                             </div>
//                                         </div>
//                                         <div className="row text-start small mt-2">
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
//                                                 <strong>Payment Provider:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <span className={`badge ${providerInfo.badge}`}>
//                                                     {typeof providerInfo.icon === 'string' ? providerInfo.icon : ''} {providerInfo.name}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="row text-start small mt-2">
//                                             <div className="col-6">
//                                                 <strong>Payment ID:</strong>
//                                             </div>
//                                             <div className="col-6">
//                                                 <code className="small">{orderDetails.paymentId}</code>
//                                             </div>
//                                         </div>
//                                         {orderDetails.transactionReference && (
//                                             <div className="row text-start small mt-2">
//                                                 <div className="col-6">
//                                                     <strong>Transaction Ref:</strong>
//                                                 </div>
//                                                 <div className="col-6">
//                                                     <code className="small">{orderDetails.transactionReference}</code>
//                                                 </div>
//                                             </div>
//                                         )}
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
//                                         Having issues? Contact our support team with your Order ID and Payment ID above.
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

// export default UnifiedPaymentSuccessPage;

// Debug version of PaymentSuccessPage - Replace your current version

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';

// const UnifiedPaymentSuccessPage = () => {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [debugInfo, setDebugInfo] = useState({}); // DEBUG: Add debug info state
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cart, clearCart } = useCart();

//   // Fix: Use import.meta.env instead of process.env for Vite
//   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
    
//     // DEBUG: Log URL parameters
//     console.log('=== PAYMENT SUCCESS DEBUG ===');
//     console.log('URL:', location.href);
//     console.log('URL Params:', Object.fromEntries(urlParams.entries()));
    
//     const paypalToken = urlParams.get('token');
//     const paypalPayerId = urlParams.get('PayerID');
//     const worldpayPaymentId = urlParams.get('paymentId');
//     const worldpayTransactionRef = urlParams.get('transactionRef');

//     setDebugInfo({
//       url: location.href,
//       params: Object.fromEntries(urlParams.entries()),
//       paypalToken,
//       paypalPayerId,
//       cartLength: cart?.length || 0,
//       apiUrl: API_URL
//     });

//     if (paypalToken && paypalPayerId) {
//       handlePayPalSuccess(paypalToken, paypalPayerId);
//     } else if (worldpayPaymentId) {
//       handleWorldpaySuccess(worldpayPaymentId, worldpayTransactionRef);
//     } else {
//       setError('Invalid payment parameters');
//       setLoading(false);
//     }
//   }, [location]);

//   const getSessionId = () => {
//     let sessionId = localStorage.getItem('sessionId');
//     if (!sessionId) {
//       sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       localStorage.setItem('sessionId', sessionId);
//     }
//     return sessionId;
//   };

//   const prepareCartDataForBackend = () => {
//     console.log('=== CART DATA PREPARATION ===');
//     console.log('Cart from context:', cart);
    
//     // Try multiple sources for cart data
//     const sources = [
//       { name: 'React Context', data: cart },
//       { name: 'localStorage', data: localStorage.getItem('cart') },
//       { name: 'sessionStorage', data: sessionStorage.getItem('cart') },
//       { name: 'lastOrderData', data: localStorage.getItem('lastOrderData') }
//     ];

//     for (const source of sources) {
//       console.log(`${source.name}:`, source.data);
//     }

//     // First try: Use cart from context
//     if (cart && cart.length > 0) {
//       console.log('✅ Using cart from context');
//       return mapCartItemsToBackendFormat(cart);
//     }
    
//     // Second try: Get cart from localStorage
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       try {
//         const parsedCart = JSON.parse(storedCart);
//         if (parsedCart && parsedCart.length > 0) {
//           console.log('✅ Using cart from localStorage');
//           return mapCartItemsToBackendFormat(parsedCart);
//         }
//       } catch (e) {
//         console.error('Error parsing stored cart:', e);
//       }
//     }

//     console.warn('⚠️ No cart data available - creating fallback');
    
//     // Fallback: Create a basic order item
//     const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
//     const pricingInfo = JSON.parse(localStorage.getItem('pricingInfo') || '{}');
    
//     return [{
//       name: 'Custom Number Plate',
//       type: 'plate',
//       price: pricingInfo.total || 25.00,
//       quantity: 1,
//       subtotal: pricingInfo.total || 25.00,
//       registration: 'UNKNOWN',
//       side: 'front',
//       roadLegal: 'No',
//       spacing: 'legal',
//       plateStyle: 'standard',
//       styleLabel: 'Standard Plate',
//       fontColor: '#000000',
//       fontColorName: 'Black',
//       borderStyle: 'none',
//       borderName: 'No Border',
//       size: 'standard',
//       sizeLabel: 'Standard Size'
//     }];
//   };

//   const mapCartItemsToBackendFormat = (items) => {
//     return items.map(item => ({
//       name: item.name || `${item.registration || 'Custom'} Number Plate`,
//       type: item.type || 'plate',
//       price: item.price || 0,
//       quantity: item.quantity || 1,
//       subtotal: item.subtotal || (item.price * item.quantity),
//       registration: item.registration || item.text || 'UNKNOWN',
//       side: item.side || 'front',
//       roadLegal: item.roadLegal || 'No',
//       spacing: item.spacing || 'legal',
//       plateStyle: item.plateStyle || 'standard',
//       styleLabel: item.styleLabel || 'Standard Plate',
//       stylePrice: item.stylePrice || 0,
//       size: item.size || 'standard',
//       sizeLabel: item.sizeLabel || 'Standard Size',
//       sizeDimensions: item.sizeDimensions || '520mm x 111mm',
//       sizePrice: item.sizePrice || 0,
//       fontColor: item.fontColor || '#000000',
//       fontColorName: item.fontColorName || 'Black',
//       fontColorPrice: item.fontColorPrice || 0,
//       borderStyle: item.borderStyle || 'none',
//       borderName: item.borderName || 'No Border',
//       borderType: item.borderType || 'none',
//       borderColor: item.borderColor || '',
//       borderWidth: item.borderWidth || 0,
//       borderPrice: item.borderPrice || 0,
//       countryBadge: item.countryBadge || 'none',
//       selectedCountry: item.selectedCountry || 'uk',
//       badgeName: item.badgeName || 'No Badge',
//       badgePosition: item.badgePosition || 'left',
//       flagImage: item.flagImage || '',
//       badgePrice: item.badgePrice || 0,
//       finish: item.finish || 'standard',
//       finishLabel: item.finishLabel || 'Standard Finish',
//       finishDescription: item.finishDescription || '',
//       finishPrice: item.finishPrice || 0,
//       thickness: item.thickness || '3mm',
//       thicknessLabel: item.thicknessLabel || '3mm Standard',
//       thicknessValue: item.thicknessValue || 3,
//       thicknessPrice: item.thicknessPrice || 0,
//       shadowEffect: item.shadowEffect || 'none',
//       shadowName: item.shadowName || 'No Effect',
//       shadowDescription: item.shadowDescription || '',
//       shadowPrice: item.shadowPrice || 0,
//       displayText: item.displayText || item.registration || item.text,
//       font: item.font || 'Charles Wright',
//       fontSize: item.fontSize || 79
//     }));
//   };

//   const handlePayPalSuccess = async (token, payerId) => {
//     try {
//       console.log('=== PAYPAL PROCESSING ===');
//       console.log('Token:', token);
//       console.log('PayerID:', payerId);
      
//       const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
//       const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
//       const pricingInfo = JSON.parse(localStorage.getItem('pricingInfo') || '{}');
      
//       console.log('Customer Info:', customerInfo);
//       console.log('Shipping Address:', shippingAddress);
//       console.log('Pricing Info:', pricingInfo);
      
//       const cartItems = prepareCartDataForBackend();
//       console.log('Cart Items to Send:', cartItems);

//       const requestBody = {
//         payerId,
//         sessionId: getSessionId(),
//         customerInfo: {
//           name: customerInfo.name || shippingAddress.name || 'Customer',
//           email: customerInfo.email || 'customer@example.com',
//           phone: customerInfo.phone || shippingAddress.phone || ''
//         },
//         shippingAddress: {
//           name: shippingAddress.name || customerInfo.name || 'Customer',
//           street: shippingAddress.street || shippingAddress.address || 'Not provided',
//           city: shippingAddress.city || 'Not provided',
//           state: shippingAddress.state || '',
//           postcode: shippingAddress.postcode || shippingAddress.zipCode || 'Not provided',
//           country: shippingAddress.country || 'GB',
//           phone: shippingAddress.phone || customerInfo.phone || ''
//         },
//         pricing: {
//           subtotal: pricingInfo.subtotal || 0,
//           discount: pricingInfo.discount || 0,
//           discountCode: pricingInfo.discountCode || '',
//           shipping: pricingInfo.shipping || 0,
//           shippingMethod: pricingInfo.shippingMethod || 'tracked',
//           tax: pricingInfo.tax || 0,
//           taxRate: pricingInfo.taxRate || 0.20,
//           total: pricingInfo.total || cartItems.reduce((sum, item) => sum + item.subtotal, 0)
//         },
//         cartItems: cartItems
//       };

//       console.log('=== REQUEST BODY ===');
//       console.log(JSON.stringify(requestBody, null, 2));

//       const url = `${API_URL}/capture-paypal-order/${token}`;
//       console.log('=== API REQUEST ===');
//       console.log('URL:', url);

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       console.log('=== RESPONSE STATUS ===');
//       console.log('Status:', response.status);
//       console.log('Status Text:', response.statusText);

//       const result = await response.json();
//       console.log('=== RESPONSE DATA ===');
//       console.log(JSON.stringify(result, null, 2));

//       // Update debug info
//       setDebugInfo(prev => ({
//         ...prev,
//         requestBody,
//         responseStatus: response.status,
//         responseData: result
//       }));

//       if (result.success) {
//         setOrderDetails({
//           orderId: result.orderId,
//           paymentId: result.paymentId,
//           amount: result.amount,
//           currency: result.currency || 'GBP',
//           provider: 'PayPal',
//           status: 'Success',
//           items: cartItems.length
//         });
        
//         // Clear cart and stored data
//         clearCart();
//         localStorage.removeItem('customerInfo');
//         localStorage.removeItem('shippingAddress');
//         localStorage.removeItem('pricingInfo');
//         localStorage.removeItem('cart');
//         sessionStorage.removeItem('cart');
        
//         console.log('✅ Order processed successfully');
//       } else {
//         console.error('❌ Backend returned error:', result.error);
//         setError(result.error || 'Payment verification failed');
//       }
//     } catch (error) {
//       console.error('❌ Request failed:', error);
//       setError('Failed to process payment verification');
      
//       // Update debug info with error
//       setDebugInfo(prev => ({
//         ...prev,
//         error: error.message,
//         stack: error.stack
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWorldpaySuccess = async (paymentId, transactionRef) => {
//     // Similar implementation for Worldpay
//     setLoading(false);
//     setError('Worldpay processing not implemented in debug version');
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-warning mb-3" style={{ width: '3rem', height: '3rem' }}>
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="text-dark">Processing your payment...</h4>
//           <p className="text-muted">Please wait while we verify your order</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
//         <div className="text-center">
//           <div className="alert alert-danger" style={{ maxWidth: '800px' }}>
//             <h4 className="alert-heading">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               Payment Error
//             </h4>
//             <p>{error}</p>
            
//             {/* DEBUG: Show debug information */}
//             <details className="mt-3">
//               <summary className="btn btn-outline-secondary btn-sm">Show Debug Info</summary>
//               <pre className="mt-2 text-start small bg-light p-2 rounded">
//                 {JSON.stringify(debugInfo, null, 2)}
//               </pre>
//             </details>
            
//             <hr />
//             <button className="btn btn-outline-danger" onClick={() => navigate('/basket')}>
//               Return to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="text-center">
//         <div className="card shadow-lg border-0" style={{ maxWidth: '800px' }}>
//           <div className="card-header bg-success text-white text-center py-4">
//             <div className="mb-3">
//               <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }}></i>
//             </div>
//             <h2 className="mb-0">Payment Successful!</h2>
//           </div>
//           <div className="card-body p-4">
//             {orderDetails ? (
//               <>
//                 <div className="alert alert-success">
//                   <h5 className="alert-heading">
//                     <i className="bi bi-receipt me-2"></i>
//                     Order Confirmed
//                   </h5>
//                   <p className="mb-0">Your number plate order has been successfully processed and stored with complete configuration details.</p>
//                 </div>
                
//                 <div className="row text-start">
//                   <div className="col-md-6">
//                     <h6 className="fw-bold text-warning">Order Information</h6>
//                     <p><strong>Order ID:</strong><br />
//                     <span className="font-monospace small">{orderDetails.orderId || 'Not provided'}</span></p>
//                     <p><strong>Payment Method:</strong><br />
//                     <span className="badge bg-primary">{orderDetails.provider || 'Unknown'}</span></p>
//                     <p><strong>Items:</strong><br />
//                     {orderDetails.items || 0} plate(s) ordered</p>
//                   </div>
//                   <div className="col-md-6">
//                     <h6 className="fw-bold text-warning">Payment Details</h6>
//                     <p><strong>Amount Paid:</strong><br />
//                     <span className="h5 text-success">£{orderDetails.amount || '0.00'} {orderDetails.currency || 'GBP'}</span></p>
//                     <p><strong>Transaction ID:</strong><br />
//                     <span className="font-monospace small">{orderDetails.paymentId || 'Not provided'}</span></p>
//                     <p><strong>Status:</strong><br />
//                     <span className="badge bg-success">{orderDetails.status || 'Unknown'}</span></p>
//                   </div>
//                 </div>
                
//                 {/* DEBUG: Show debug information */}
//                 <details className="mt-3">
//                   <summary className="btn btn-outline-secondary btn-sm">Show Debug Info</summary>
//                   <pre className="mt-2 text-start small bg-light p-2 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
//                     {JSON.stringify(debugInfo, null, 2)}
//                   </pre>
//                 </details>
                
//                 <div className="alert alert-info mt-3">
//                   <h6><i className="bi bi-info-circle me-2"></i>What happens next?</h6>
//                   <ul className="mb-0 small">
//                     <li>Your order details have been saved with complete plate configurations</li>
//                     <li>You will receive an email confirmation shortly</li>
//                     <li>Our team will begin processing your custom plates</li>
//                     <li>You can track your order status in your account</li>
//                   </ul>
//                 </div>
//               </>
//             ) : (
//               <div className="alert alert-warning">
//                 <h5 className="alert-heading">Order Processing Issue</h5>
//                 <p>Payment was successful but order details are missing.</p>
                
//                 {/* DEBUG: Show debug information */}
//                 <details className="mt-3">
//                   <summary className="btn btn-outline-secondary btn-sm">Show Debug Info</summary>
//                   <pre className="mt-2 text-start small bg-light p-2 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
//                     {JSON.stringify(debugInfo, null, 2)}
//                   </pre>
//                 </details>
//               </div>
//             )}
            
//             <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
//               <button 
//                 className="btn btn-warning btn-lg me-md-2" 
//                 onClick={() => navigate('/')}
//               >
//                 <i className="bi bi-house me-2"></i>
//                 Continue Shopping
//               </button>
//               <button 
//                 className="btn btn-outline-primary btn-lg" 
//                 onClick={() => window.print()}
//               >
//                 <i className="bi bi-printer me-2"></i>
//                 Print Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnifiedPaymentSuccessPage;


// REPLACE your existing UnifiedPaymentSuccessPage with this fixed version

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './PaymentSuccessPage.css';

// const UnifiedPaymentSuccessPage = () => {
//     const [orderData, setOrderData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handlePaymentSuccess = async () => {
//             const urlParams = new URLSearchParams(location.search);
//             const token = urlParams.get('token'); // PayPal order ID
//             const PayerID = urlParams.get('PayerID');
            
//             console.log('🔥 Payment Success Page - URL Params:', { token, PayerID });
            
//             if (!token) {
//                 setError('Missing payment information');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // Get session data
//                 const sessionId = localStorage.getItem('sessionId') || 'default-session';
//                 const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
//                 const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
//                 const pricing = JSON.parse(localStorage.getItem('pricing') || '{}');
//                 const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

//                 console.log('📦 Stored data:', { sessionId, customerInfo, shippingAddress, pricing, cartItems });

//                 // Capture the PayPal payment
//                 const response = await fetch(`http://localhost:5000/capture-paypal-order/${token}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         payerId: PayerID,
//                         sessionId,
//                         customerInfo,
//                         shippingAddress,
//                         pricing,
//                         cartItems
//                     }),
//                 });

//                 const data = await response.json();
//                 console.log('✅ Capture response:', data);

//                 if (data.success) {
//                     // 🔧 FIXED: Set order data with proper transaction ID
//                     setOrderData({
//                         orderId: data.orderId,           // Amazon-style order number
//                         paymentId: data.paymentId,       // PayPal Transaction ID
//                         amount: data.amount,
//                         currency: data.currency,
//                         provider: data.provider,
//                         status: data.status,
//                         orderDetails: data.orderDetails
//                     });

//                     console.log('💳 Order data set:', {
//                         orderId: data.orderId,
//                         paymentId: data.paymentId,
//                         amount: data.amount
//                     });

//                     // Clear stored checkout data
//                     localStorage.removeItem('customerInfo');
//                     localStorage.removeItem('shippingAddress');
//                     localStorage.removeItem('pricing');
//                     localStorage.removeItem('cartItems');
//                     localStorage.removeItem('plateCart'); // Also clear the cart
//                 } else {
//                     setError(data.error || 'Payment processing failed');
//                 }
//             } catch (err) {
//                 console.error('💥 Error processing payment:', err);
//                 setError('Network error occurred while processing payment');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         handlePaymentSuccess();
//     }, [location]);

//     const handleContinueShopping = () => {
//         navigate('/');
//     };

//     const handlePrintReceipt = () => {
//         window.print();
//     };

//     if (loading) {
//         return (
//             <div className="payment-success-container">
//                 <div className="loading-spinner">
//                     <div className="spinner"></div>
//                     <p>Processing your payment...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="payment-success-container">
//                 <div className="error-card">
//                     <h2>Payment Error</h2>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/basket')} className="btn-primary">
//                         Return to Cart
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="payment-success-container">
//             <div className="success-card">
//                 <div className="success-header">
//                     <div className="checkmark">✓</div>
//                     <h1>Payment Successful!</h1>
//                 </div>

//                 <div className="order-confirmation">
//                     <h2>Order Confirmed</h2>
//                     <p>Thank you! Your number plate order has been successfully processed.</p>
//                 </div>

//                 <div className="order-details">
//                     <div className="detail-section">
//                         <h3>Order Information</h3>
//                         <div className="detail-row">
//                             <span className="label">Order Number:</span>
//                             <span className="value order-id">{orderData?.orderId}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="label">Payment Method:</span>
//                             <span className="value">
//                                 <span className="paypal-badge">PayPal</span>
//                             </span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="label">Status:</span>
//                             <span className="value">
//                                 <span className="status-badge confirmed">Confirmed</span>
//                             </span>
//                         </div>
//                     </div>

//                     <div className="detail-section">
//                         <h3>Payment Details</h3>
//                         <div className="detail-row">
//                             <span className="label">Amount Paid:</span>
//                             <span className="value amount">
//                                 £{orderData?.amount?.toFixed(2)} {orderData?.currency}
//                             </span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="label">Transaction ID:</span>
//                             <span className="value transaction-id">
//                                 {orderData?.paymentId || 'Processing...'}
//                             </span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="label">Date:</span>
//                             <span className="value">
//                                 {new Date().toLocaleDateString('en-GB', {
//                                     day: '2-digit',
//                                     month: '2-digit',
//                                     year: 'numeric',
//                                     hour: '2-digit',
//                                     minute: '2-digit'
//                                 })}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="next-steps">
//                     <h3>What happens next?</h3>
//                     <ul>
//                         <li>You will receive an email confirmation shortly</li>
//                         <li>Your custom plates will be manufactured within 3-5 business days</li>
//                         <li>We'll send you tracking information once shipped</li>
//                         <li>Estimated delivery: 5-7 business days</li>
//                     </ul>
//                 </div>

//                 <div className="action-buttons">
//                     <button onClick={handleContinueShopping} className="btn-primary">
//                         Continue Shopping
//                     </button>
//                     <button onClick={handlePrintReceipt} className="btn-secondary">
//                         Print Receipt
//                     </button>
//                 </div>

//                 {/* Debug Info (remove in production) */}
//                 {process.env.NODE_ENV === 'development' && (
//                     <div className="debug-info" style={{ 
//                         marginTop: '20px', 
//                         padding: '10px', 
//                         backgroundColor: '#f0f0f0', 
//                         borderRadius: '5px',
//                         fontSize: '12px',
//                         fontFamily: 'monospace'
//                     }}>
//                         <strong>Debug Info:</strong><br />
//                         Order ID: {orderData?.orderId}<br />
//                         Payment ID: {orderData?.paymentId}<br />
//                         Amount: {orderData?.amount}<br />
//                         Currency: {orderData?.currency}<br />
//                         Status: {orderData?.status}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UnifiedPaymentSuccessPage;