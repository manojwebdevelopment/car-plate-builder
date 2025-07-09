// import React, { useState, useEffect } from 'react';
// import { X, Plus, Minus, ShoppingCart, Calculator, ArrowLeft, CreditCard, Check, Shield, Clock, ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { 
//     getCartItems, 
//     removeFromCart, 
//     updateCartItemQuantity, 
//     clearCart,
//     getCartTotal,
//     getCartItemCount 
// } from './cartUtils';

// const PaymentMethodSelector = ({ 
//     total, 
//     onPayPalCheckout, 
//     onWorldpayCheckout, 
//     checkoutLoading, 
//     cartItems 
// }) => {
//     const [selectedMethod, setSelectedMethod] = useState('paypal');

//     const handleCheckout = () => {
//         if (selectedMethod === 'paypal') {
//             onPayPalCheckout();
//         } else {
//             onWorldpayCheckout();
//         }
//     };

//     return (
//         <div className="payment-methods">
//             {/* Payment Method Selection */}
//             <div className="mb-4">
//                 <h6 className="fw-bold mb-3 text-dark">Choose Payment Method</h6>
                
//                 {/* PayPal Option */}
//                 <div 
//                     className={`payment-option ${selectedMethod === 'paypal' ? 'selected' : ''}`}
//                     onClick={() => setSelectedMethod('paypal')}
//                     style={{ cursor: 'pointer' }}
//                 >
//                     <div className={`d-flex align-items-center justify-content-between p-3 border rounded mb-2 ${
//                         selectedMethod === 'paypal' ? 'border-warning border-2' : ''
//                     }`}>
//                         <div className="d-flex align-items-center">
//                             <div className="me-3">
//                                 <div className={`rounded-circle d-flex align-items-center justify-content-center ${
//                                     selectedMethod === 'paypal' ? 'bg-warning text-dark' : 'border'
//                                 }`} style={{ width: '20px', height: '20px' }}>
//                                     {selectedMethod === 'paypal' && <Check size={12} />}
//                                 </div>
//                             </div>
//                             <div className="d-flex align-items-center">
//                                 <div className="me-3">
//                                     <span className="fw-bold text-primary" style={{ fontSize: '18px' }}>PayPal</span>
//                                 </div>
//                                 <div>
//                                     <div className="fw-semibold text-dark">PayPal</div>
//                                     <small className="text-muted">Pay with your PayPal account</small>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <span className="badge bg-primary me-1">Instant</span>
//                             <span className="badge bg-success">Trusted</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Worldpay Option */}
//                 <div 
//                     className={`payment-option ${selectedMethod === 'worldpay' ? 'selected' : ''}`}
//                     onClick={() => setSelectedMethod('worldpay')}
//                     style={{ cursor: 'pointer' }}
//                 >
//                     <div className={`d-flex align-items-center justify-content-between p-3 border rounded mb-2 ${
//                         selectedMethod === 'worldpay' ? 'border-warning border-2' : ''
//                     }`}>
//                         <div className="d-flex align-items-center">
//                             <div className="me-3">
//                                 <div className={`rounded-circle d-flex align-items-center justify-content-center ${
//                                     selectedMethod === 'worldpay' ? 'bg-warning text-dark' : 'border'
//                                 }`} style={{ width: '20px', height: '20px' }}>
//                                     {selectedMethod === 'worldpay' && <Check size={12} />}
//                                 </div>
//                             </div>
//                             <div className="d-flex align-items-center">
//                                 <div className="me-3">
//                                     <div className="bg-danger text-white px-2 py-1 rounded fw-bold" style={{ fontSize: '12px' }}>
//                                         Worldpay
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="fw-semibold text-dark">Credit/Debit Card</div>
//                                     <small className="text-muted">Visa, Mastercard, Amex accepted</small>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <span className="badge bg-warning text-dark me-1">Secure</span>
//                             <span className="badge bg-info">Fast</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Payment Features */}
//                 <div className="mt-3 p-3 bg-light rounded">
//                     <div className="row text-center">
//                         <div className="col-4">
//                             <Shield size={20} className="text-success mb-1" />
//                             <div className="small text-muted">SSL Encrypted</div>
//                         </div>
//                         <div className="col-4">
//                             <Clock size={20} className="text-primary mb-1" />
//                             <div className="small text-muted">Instant Processing</div>
//                         </div>
//                         <div className="col-4">
//                             <CreditCard size={20} className="text-warning mb-1" />
//                             <div className="small text-muted">Secure Payments</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Checkout Button */}
//             <button 
//                 className={`btn btn-lg w-100 fw-bold mb-3 ${
//                     selectedMethod === 'paypal' ? 'btn-primary' : 'btn-danger'
//                 }`}
//                 onClick={handleCheckout}
//                 disabled={checkoutLoading || cartItems.length === 0}
//                 style={{ transition: 'all 0.3s ease' }}
//             >
//                 {checkoutLoading ? (
//                     <>
//                         <div className="spinner-border spinner-border-sm me-2" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <span>Processing Payment...</span>
//                     </>
//                 ) : (
//                     <>
//                         {selectedMethod === 'paypal' ? (
//                             <>
//                                 <span className="me-2">💳</span>
//                                 Pay with PayPal - £{total}
//                             </>
//                         ) : (
//                             <>
//                                 <CreditCard className="me-2" size={20} />
//                                 Pay with Card - £{total}
//                             </>
//                         )}
//                         <ArrowRight className="ms-2" size={16} />
//                     </>
//                 )}
//             </button>

//             {/* Security Note */}
//             <div className="text-center">
//                 <small className="text-muted d-flex align-items-center justify-content-center">
//                     <Shield size={14} className="me-1" />
//                     Your payment information is secure and encrypted
//                 </small>
//             </div>
//         </div>
//     );
// };

// const CartPage = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [couponCode, setCouponCode] = useState('');
//     const [appliedCoupon, setAppliedCoupon] = useState(null);
//     const [shippingOption, setShippingOption] = useState('tracked');
//     const [loading, setLoading] = useState(true);
//     const [checkoutLoading, setCheckoutLoading] = useState(false);
    
//     const navigate = useNavigate();

//     // Load cart items from localStorage on component mount (your original logic)
//     useEffect(() => {
//         loadCartItems();
        
//         // Listen for cart updates from other components
//         const handleCartUpdate = (event) => {
//             loadCartItems();
//         };
        
//         window.addEventListener('cartUpdated', handleCartUpdate);
        
//         return () => {
//             window.removeEventListener('cartUpdated', handleCartUpdate);
//         };
//     }, []);

//     const loadCartItems = () => {
//         try {
//             const items = getCartItems(); // Your original function
//             setCartItems(items);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error loading cart items:', error);
//             setLoading(false);
//         }
//     };

//     // Remove item from cart (your original logic)
//     const handleRemoveItem = (id) => {
//         const result = removeFromCart(id);
//         if (result.success) {
//             setCartItems(result.cartItems);
//         }
//     };

//     // Update quantity (your original logic)
//     const handleUpdateQuantity = (id, newQuantity) => {
//         const result = updateCartItemQuantity(id, newQuantity);
//         if (result.success) {
//             setCartItems(result.cartItems);
//         }
//     };

//     // Clear all items (your original logic)
//     const handleClearCart = () => {
//         if (window.confirm('Are you sure you want to clear your cart?')) {
//             const result = clearCart();
//             if (result.success) {
//                 setCartItems(result.cartItems);
//                 setAppliedCoupon(null);
//             }
//         }
//     };

//     // Apply coupon (your original logic)
//     const applyCoupon = () => {
//         const coupons = {
//             'Save15': { discount: 0.15, type: 'percentage' },
//             'SAVE5': { discount: 5, type: 'fixed' }
//         };
        
//         if (coupons[couponCode]) {
//             setAppliedCoupon({ code: couponCode, ...coupons[couponCode] });
//         } else {
//             alert('Invalid coupon code');
//         }
//     };

//     // UPDATED: Handle checkout with Worldpay
//     const handlePayPalCheckout = async () => {
//         setCheckoutLoading(true);

//         try {
//             const response = await fetch('http://localhost:5000/create-paypal-order', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: total.toFixed(2),
//                     currency: 'GBP'
//                 }),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Server error: ${response.status} - ${errorText}`);
//             }

//             const data = await response.json();
//             console.log('PayPal order created:', data);

//             if (data.id) {
//                 // Store payment data for success page
//                 localStorage.setItem('pendingPayment', JSON.stringify({
//                     cartItems,
//                     total: total.toFixed(2),
//                     appliedCoupon,
//                     shippingOption,
//                     paymentId: data.id,
//                     provider: 'paypal'
//                 }));
                
//                 // Redirect to PayPal
//                 const approvalUrl = data.links.find(link => link.rel === 'approve')?.href;
//                 if (approvalUrl) {
//                     window.location.href = approvalUrl;
//                 }
//             } else {
//                 throw new Error('Failed to create PayPal order');
//             }

//         } catch (error) {
//             console.error('PayPal checkout error:', error);
//             alert('PayPal checkout failed: ' + error.message);
//         } finally {
//             setCheckoutLoading(false);
//         }
//     };

//     const handleCheckout = async () => {
//         setCheckoutLoading(true);

//         try {
//             // Calculate the total amount
//             const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
//             const discount = appliedCoupon 
//                 ? appliedCoupon.type === 'percentage' 
//                     ? subtotal * appliedCoupon.discount 
//                     : appliedCoupon.discount
//                 : 0;
//             const shippingCost = shippingOption === 'next-day' ? 7.99 : 0;
//             const taxRate = 0.20; // 20% VAT
//             const afterDiscount = subtotal - discount;
//             const tax = afterDiscount * taxRate;
//             const total = afterDiscount + shippingCost + tax;

//             // Prepare customer info
//             const customerInfo = {
//                 name: 'John Doe', // In real app, collect from form
//                 email: 'john@example.com',
//                 phone: '+44 123 456 7890'
//             };

//             // Prepare order details
//             const orderDetails = {
//                 items: cartItems.map(item => ({
//                     name: item.name,
//                     quantity: item.quantity,
//                     unitPrice: Math.round(item.price * 100), // Convert to pence
//                     totalAmount: Math.round(item.subtotal * 100)
//                 })),
//                 quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
//                 subtotal: subtotal.toFixed(2),
//                 discount: discount.toFixed(2),
//                 shipping: shippingCost.toFixed(2),
//                 tax: tax.toFixed(2),
//                 total: total.toFixed(2)
//             };

//             console.log('Sending Worldpay checkout request:', {
//                 amount: total.toFixed(2),
//                 currency: 'GBP',
//                 customerInfo,
//                 orderDetails
//             });

//             // Call Worldpay endpoint
//             const response = await fetch('http://localhost:5000/create-worldpay-payment', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: total.toFixed(2),
//                     currency: 'GBP',
//                     customerInfo,
//                     orderDetails
//                 }),
//             });

//             console.log('Response status:', response.status);
//             console.log('Response ok:', response.ok);

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.error('Server response:', errorText);
//                 throw new Error(`Server error: ${response.status} - ${errorText}`);
//             }

//             const data = await response.json();
//             console.log('Worldpay payment data:', data);

//             if (data.success && data.paymentId) {
//                 // Store payment data for success page
//                 localStorage.setItem('pendingPayment', JSON.stringify({
//                     cartItems,
//                     total: total.toFixed(2),
//                     appliedCoupon,
//                     shippingOption,
//                     paymentId: data.paymentId,
//                     transactionReference: data.transactionReference,
//                     provider: 'worldpay'
//                 }));
                
//                 console.log('Payment created successfully, redirecting...');
                
//                 // For direct API integration, redirect to success page immediately
//                 // In a real hosted payment page setup, you'd redirect to Worldpay's payment form
//                 if (data.redirectUrl) {
//                     window.location.href = data.redirectUrl;
//                 } else {
//                     // Fallback redirect
//                     navigate(`/payment-success?paymentId=${data.paymentId}&transactionRef=${data.transactionReference}`);
//                 }
//             } else {
//                 throw new Error(data.error || 'Failed to create Worldpay payment');
//             }

//         } catch (error) {
//             console.error('Checkout error:', error);
//             alert('Checkout failed: ' + error.message + '\n\nPlease make sure the backend server is running on http://localhost:5000');
//         } finally {
//             setCheckoutLoading(false);
//         }
//     };

//     // Calculate totals (your original logic)
//     const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
//     const discount = appliedCoupon 
//         ? appliedCoupon.type === 'percentage' 
//             ? subtotal * appliedCoupon.discount 
//             : appliedCoupon.discount
//         : 0;
//     const shippingCost = shippingOption === 'next-day' ? 7.99 : 0;
//     const taxRate = 0.20; // 20% VAT
//     const afterDiscount = subtotal - discount;
//     const tax = afterDiscount * taxRate;
//     const total = afterDiscount + shippingCost + tax;

//     if (loading) {
//         return (
//             <div className="min-vh-100 d-flex align-items-center justify-content-center">
//                 <div className="text-center">
//                     <div className="spinner-border text-warning" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="mt-2">Loading cart...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>

//             <div className="container py-4">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="d-flex align-items-center justify-content-between mb-4">
//                             <h2 className="mb-0">
//                                 <ShoppingCart className="me-2" size={32} />
//                                 Your Basket ({getCartItemCount()} items)
//                             </h2>
//                             <div className="d-flex gap-2">
//                                 <button 
//                                     onClick={() => navigate('/plate-builder')}
//                                     className="btn btn-outline-warning"
//                                 >
//                                     <ArrowLeft className="me-2" size={16} />
//                                     Continue Shopping
//                                 </button>
//                                 {cartItems.length > 0 && (
//                                     <button 
//                                         onClick={handleClearCart}
//                                         className="btn btn-outline-danger"
//                                     >
//                                         Clear Cart
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {cartItems.length === 0 ? (
//                     <div className="text-center py-5">
//                         <ShoppingCart size={64} className="text-muted mb-3" />
//                         <h4 className="text-muted">Your basket is empty</h4>
//                         <p className="text-muted">Add some plates to get started!</p>
//                     </div>
//                 ) : (
//                     <div className="row g-4">
//                         {/* Cart Items - Same as before */}
//                         <div className="col-lg-8">
//                             <div className="card border-0 shadow-sm">
//                                 <div className="card-header bg-warning text-dark">
//                                     <div className="row fw-bold">
//                                         <div className="col-4">Product</div>
//                                         <div className="col-2 text-center">Price</div>
//                                         <div className="col-2 text-center">Quantity</div>
//                                         <div className="col-3 text-center">Subtotal</div>
//                                         <div className="col-1"></div>
//                                     </div>
//                                 </div>
//                                 <div className="card-body p-0">
//                                     {cartItems.map((item) => (
//                                         <div key={item.id} className="border-bottom p-3">
//                                             <div className="row align-items-center">
//                                                 <div className="col-4">
//                                                     <div className="d-flex align-items-center">
//                                                         <img
//                                                             src={item.image}
//                                                             alt={item.name}
//                                                             className="me-3 border rounded"
//                                                             style={{ width: '80px', height: '40px', objectFit: 'cover' }}
//                                                         />
//                                                         <div>
//                                                             <h6 className="mb-1 fw-bold">{item.name}</h6>
//                                                             {item.type === 'plate' && (
//                                                                 <div className="small text-muted">
//                                                                     <div><strong>Side:</strong> {item.side} +£{item.price}</div>
//                                                                     <div><strong>Registration:</strong> {item.registration}</div>
//                                                                     <div><strong>Road Legal Spacing:</strong> {item.roadLegal}</div>
//                                                                     <div><strong>Size:</strong> {item.size}</div>
//                                                                     {item.plateStyle && <div><strong>Style:</strong> {item.plateStyle}</div>}
//                                                                     {item.fontColor && <div><strong>Color:</strong> {item.fontColor}</div>}
//                                                                     {item.borderStyle && item.borderStyle !== 'none' && <div><strong>Border:</strong> {item.borderStyle}</div>}
//                                                                     {item.shadowEffect && item.shadowEffect !== 'none' && <div><strong>Effect:</strong> {item.shadowEffect}</div>}
//                                                                 </div>
//                                                             )}
//                                                             {item.type === 'fixing-kit' && (
//                                                                 <div className="small text-success fw-bold">
//                                                                     Free with any plate order!
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-2 text-center">
//                                                     <span className="fw-bold">
//                                                         {item.price === 0 ? 'Free!' : `£${item.price.toFixed(2)}`}
//                                                     </span>
//                                                 </div>
//                                                 <div className="col-2 text-center">
//                                                     {item.type === 'fixing-kit' ? (
//                                                         <div className="text-center">
//                                                             <span className="fw-bold bg-success text-white px-2 py-1 rounded">
//                                                                 1 Kit
//                                                             </span>
//                                                             <div className="small text-success mt-1">
//                                                                 Fixed quantity
//                                                             </div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="input-group" style={{ width: '120px', margin: '0 auto' }}>
//                                                             <button
//                                                                 className="btn btn-outline-warning btn-sm"
//                                                                 onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//                                                             >
//                                                                 <Minus size={14} />
//                                                             </button>
//                                                             <input
//                                                                 type="number"
//                                                                 className="form-control form-control-sm text-center"
//                                                                 value={item.quantity}
//                                                                 onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
//                                                                 min="1"
//                                                             />
//                                                             <button
//                                                                 className="btn btn-outline-warning btn-sm"
//                                                                 onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//                                                             >
//                                                                 <Plus size={14} />
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className="col-3 text-center">
//                                                     <span className="fw-bold">£{item.subtotal.toFixed(2)}</span>
//                                                 </div>
//                                                 <div className="col-1 text-center">
//                                                     {item.type === 'fixing-kit' ? (
//                                                         <span className="text-muted small">
//                                                             <i>Included</i>
//                                                         </span>
//                                                     ) : (
//                                                         <button
//                                                             className="btn btn-outline-danger btn-sm"
//                                                             onClick={() => handleRemoveItem(item.id)}
//                                                         >
//                                                             <X size={16} />
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Coupon Section - Same as before */}
//                             <div className="card border-0 shadow-sm mt-4">
//                                 <div className="card-body">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-8">
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 placeholder="Coupon code"
//                                                 value={couponCode}
//                                                 onChange={(e) => setCouponCode(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="col-md-4">
//                                             <button 
//                                                 className="btn btn-warning w-100 fw-bold"
//                                                 onClick={applyCoupon}
//                                             >
//                                                 APPLY COUPON
//                                             </button>
//                                         </div>
//                                     </div>
//                                     {appliedCoupon && (
//                                         <div className="alert alert-success mt-3 mb-0">
//                                             <strong>Coupon Applied:</strong> {appliedCoupon.code} 
//                                             (-£{discount.toFixed(2)})
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mt-4">
//                                 <button className="btn btn-warning btn-lg fw-bold">
//                                     UPDATE BASKET
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Order Summary */}
//                         <div className="col-lg-4">
//                             <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
//                                 <div className="card-header bg-warning text-dark">
//                                     <h5 className="mb-0 fw-bold">Basket totals</h5>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="d-flex justify-content-between mb-3">
//                                         <span>Subtotal</span>
//                                         <span className="fw-bold">£{subtotal.toFixed(2)}</span>
//                                     </div>

//                                     {appliedCoupon && (
//                                         <div className="d-flex justify-content-between mb-3 text-success">
//                                             <span>Discount ({appliedCoupon.code})</span>
//                                             <span className="fw-bold">-£{discount.toFixed(2)}</span>
//                                         </div>
//                                     )}

//                                     <div className="mb-3">
//                                         <div className="fw-bold mb-2">Shipping</div>
//                                         <div className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="shipping"
//                                                 id="tracked"
//                                                 value="tracked"
//                                                 checked={shippingOption === 'tracked'}
//                                                 onChange={(e) => setShippingOption(e.target.value)}
//                                             />
//                                             <label className="form-check-label small" htmlFor="tracked">
//                                                 <strong>Tracked Shipping (FREE)</strong> - Parcels are delivered
//                                                 two working days after an order has been processed.
//                                             </label>
//                                         </div>
//                                         <div className="form-check mt-2">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="shipping"
//                                                 id="nextday"
//                                                 value="next-day"
//                                                 checked={shippingOption === 'next-day'}
//                                                 onChange={(e) => setShippingOption(e.target.value)}
//                                             />
//                                             <label className="form-check-label small" htmlFor="nextday">
//                                                 <strong>Next-Day Delivery (Order By 12PM): £7.99</strong> - 
//                                                 Orders must be placed by midday for guaranteed
//                                                 next-day delivery.
//                                             </label>
//                                         </div>
//                                         <div className="form-check mt-2">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="shipping"
//                                                 id="collection"
//                                                 value="collection"
//                                                 onChange={(e) => setShippingOption(e.target.value)}
//                                             />
//                                             <label className="form-check-label small" htmlFor="collection">
//                                                 <strong>Collection (FREE)</strong> - From Westbury, Wiltshire, BA13 3QS. 
//                                                 Orders are ready to collect in 1 business day.
//                                             </label>
//                                         </div>
//                                         <div className="mt-2">
//                                             <small className="text-muted">
//                                                 Shipping options will be updated during checkout.
//                                             </small>
//                                         </div>
//                                         <div className="mt-2">
//                                             <a href="#" className="text-decoration-none">
//                                                 <Calculator size={16} className="me-1" />
//                                                 Calculate shipping
//                                             </a>
//                                         </div>
//                                     </div>

//                                     <div className="mb-3">
//                                         <div className="fw-bold mb-2">Gift card</div>
//                                         <a href="#" className="text-decoration-none">Apply gift card</a>
//                                     </div>

//                                     <hr />

//                                     <div className="d-flex justify-content-between mb-3">
//                                         <span className="fw-bold fs-5">Total</span>
//                                         <span className="fw-bold fs-4">
//                                             £{total.toFixed(2)} 
//                                             <small className="text-muted">(includes £{tax.toFixed(2)} Tax)</small>
//                                         </span>
//                                     </div>

//                                     <PaymentMethodSelector
//                                         total={total.toFixed(2)}
//                                         onPayPalCheckout={handlePayPalCheckout}
//                                         onWorldpayCheckout={handleCheckout}
//                                         checkoutLoading={checkoutLoading}
//                                         cartItems={cartItems}
//                                     />

//                                     {/* Security message is now handled by PaymentMethodSelector */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CartPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // BYPASS CONTEXT - Load directly from localStorage
//   useEffect(() => {
//     console.log('🔥 DIRECT CART LOADING');
    
//     // Try all possible cart storage keys
//     const possibleKeys = ['plateCart', 'cart', 'plateBuilderCart'];
//     let loadedCart = [];
    
//     for (const key of possibleKeys) {
//       try {
//         const data = localStorage.getItem(key);
//         console.log(`Checking ${key}:`, data);
        
//         if (data && data !== '[]' && data !== 'null' && data !== 'undefined') {
//           const parsed = JSON.parse(data);
//           if (Array.isArray(parsed) && parsed.length > 0) {
//             console.log(`✅ Found cart data in ${key}:`, parsed);
//             loadedCart = parsed;
//             break;
//           }
//         }
//       } catch (error) {
//         console.error(`Error parsing ${key}:`, error);
//       }
//     }
    
//     console.log('🛒 Final loaded cart:', loadedCart);
//     setCart(loadedCart);
//     setLoading(false);
//   }, []);

//   // Save cart changes
//   const saveCart = (newCart) => {
//     setCart(newCart);
//     localStorage.setItem('plateCart', JSON.stringify(newCart));
//   };

//   // Remove item
//   const removeFromCart = (itemId) => {
//     const newCart = cart.filter(item => item.id !== itemId);
//     saveCart(newCart);
//   };

//   // Update quantity
//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(itemId);
//       return;
//     }

//     const newCart = cart.map(item =>
//       item.id === itemId
//         ? {
//             ...item,
//             quantity: newQuantity,
//             subtotal: item.price * newQuantity
//           }
//         : item
//     );
//     saveCart(newCart);
//   };

//   // Calculate totals
//   const getCartTotal = () => cart.reduce((total, item) => total + (item.subtotal || 0), 0);
//   const getCartItemCount = () => cart.reduce((count, item) => count + (item.quantity || 0), 0);

//   const subtotal = getCartTotal();
//   const taxRate = 0.18; // 18% GST for India
//   const tax = subtotal * taxRate;
//   const shipping = 0; // Free shipping
//   const total = subtotal + tax + shipping;

//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       alert('Your cart is empty!');
//       return;
//     }
//     navigate('/checkout');
//   };

//   const handleContinueShopping = () => {
//     navigate('/platebuilder');
//   };

//   if (loading) {
//     return (
//       <div className="container py-5">
//         <div className="text-center">
//           <div className="spinner-border text-warning" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2">Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 text-center">
//             <div className="card border-0 shadow-sm">
//               <div className="card-body p-5">
//                 <i className="bi bi-cart-x display-1 text-warning mb-3"></i>
//                 <h3 className="text-dark mb-3">Your Cart is Empty</h3>
//                 <p className="text-muted mb-4">
//                   Looks like you haven't added any items to your cart yet.
//                 </p>
//                 <button 
//                   className="btn btn-warning btn-lg"
//                   onClick={handleContinueShopping}
//                 >
//                   <i className="bi bi-plus-circle me-2"></i>
//                   Start Shopping
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <div className="row">
//         {/* Cart Items */}
//         <div className="col-lg-8">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-warning text-dark">
//               <h4 className="mb-0">
//                 <i className="bi bi-cart-fill me-2"></i>
//                 Your Cart ({getCartItemCount()} items)
//               </h4>
//             </div>
//             <div className="card-body">
//               {cart.map((item, index) => (
//                 <div key={item.id || index} className="row align-items-center border-bottom py-3">
//                   <div className="col-md-2">
//                     <div className="bg-light rounded p-3 text-center">
//                       <i className="bi bi-card-text display-6 text-warning"></i>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <h6 className="fw-bold text-dark">{item.name}</h6>
//                     <p className="text-muted small mb-1">
//                       <strong>Registration:</strong> {item.registration || 'N/A'}
//                     </p>
//                     <p className="text-muted small mb-1">
//                       <strong>Side:</strong> {item.side || 'Front'}
//                     </p>
//                     <p className="text-muted small mb-0">
//                       <strong>Style:</strong> {item.styleLabel || 'Standard'}
//                     </p>
//                   </div>
//                   <div className="col-md-2 text-center">
//                     <div className="input-group input-group-sm">
//                       <button 
//                         className="btn btn-outline-secondary"
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         disabled={item.quantity <= 1}
//                       >
//                         -
//                       </button>
//                       <input 
//                         type="text" 
//                         className="form-control text-center" 
//                         value={item.quantity}
//                         readOnly
//                       />
//                       <button 
//                         className="btn btn-outline-secondary"
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <div className="col-md-2 text-center">
//                     <span className="fw-bold text-success">
//                       £{item.price?.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="col-md-2 text-center">
//                     <span className="fw-bold text-dark">
//                       £{(item.price * item.quantity)?.toFixed(2)}
//                     </span>
//                     <br />
//                     <button 
//                       className="btn btn-sm btn-outline-danger mt-1"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       <i className="bi bi-trash"></i>
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="pt-3">
//                 <button 
//                   className="btn btn-outline-warning"
//                   onClick={handleContinueShopping}
//                 >
//                   <i className="bi bi-arrow-left me-2"></i>
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="col-lg-4">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-dark text-white">
//               <h5 className="mb-0">
//                 <i className="bi bi-receipt me-2"></i>
//                 Order Summary
//               </h5>
//             </div>
//             <div className="card-body">
//               <div className="d-flex justify-content-between mb-2">
//                 <span>Subtotal ({getCartItemCount()} items):</span>
//                 <span>£{subtotal.toFixed(2)}</span>
//               </div>
//               <div className="d-flex justify-content-between mb-2">
//                 <span>Shipping:</span>
//                 <span className="text-success">FREE</span>
//               </div>
//               <div className="d-flex justify-content-between mb-2">
//                 <span>GST (18%):</span>
//                 <span>£{tax.toFixed(2)}</span>
//               </div>
//               <hr />
//               <div className="d-flex justify-content-between mb-3">
//                 <span className="fw-bold fs-5">Total:</span>
//                 <span className="fw-bold fs-5 text-success">£{total.toFixed(2)}</span>
//               </div>
              
//               {/* Checkout Button */}
//               <button 
//                 className="btn btn-warning btn-lg w-100 mb-3"
//                 onClick={handleCheckout}
//               >
//                 <i className="bi bi-credit-card me-2"></i>
//                 Proceed to Checkout
//               </button>
              
//               {/* Security & Trust Badges */}
//               <div className="text-center">
//                 <div className="row g-2 mb-3">
//                   <div className="col-4">
//                     <div className="badge bg-success w-100 py-2">
//                       <i className="bi bi-shield-check"></i><br />
//                       <small>Secure</small>
//                     </div>
//                   </div>
//                   <div className="col-4">
//                     <div className="badge bg-info w-100 py-2">
//                       <i className="bi bi-truck"></i><br />
//                       <small>Fast Ship</small>
//                     </div>
//                   </div>
//                   <div className="col-4">
//                     <div className="badge bg-warning text-dark w-100 py-2">
//                       <i className="bi bi-award"></i><br />
//                       <small>Quality</small>
//                     </div>
//                   </div>
//                 </div>
                
//                 <p className="small text-muted mb-0">
//                   <i className="bi bi-lock-fill me-1"></i>
//                   Your payment information is processed securely via PayPal
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Estimated Delivery */}
//           <div className="card border-0 shadow-sm mt-3">
//             <div className="card-body text-center">
//               <h6 className="text-warning">
//                 <i className="bi bi-calendar-check me-2"></i>
//                 Estimated Delivery
//               </h6>
//               <p className="mb-0 fw-bold text-dark">
//                 5-7 Business Days
//               </p>
//               <small className="text-muted">
//                 Free standard shipping included
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    loading, 
    syncPending, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartItemCount 
  } = useCart();

  // Calculate totals
  const subtotal = getCartTotal();
  const taxRate = 0.18; // 18% GST for India
  const tax = subtotal * taxRate;
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/platebuilder');
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <i className="bi bi-cart-x display-1 text-warning mb-3"></i>
                <h3 className="text-dark mb-3">Your Cart is Empty</h3>
                <p className="text-muted mb-4">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button 
                  className="btn btn-warning btn-lg"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Sync Status Indicator */}
      {syncPending && (
        <div className="alert alert-info d-flex align-items-center mb-4">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Syncing your cart...</span>
        </div>
      )}

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="bi bi-cart-fill me-2"></i>
                Your Cart ({getCartItemCount()} items)
              </h4>
            </div>
            <div className="card-body">
              {cart.map((item, index) => (
                <div key={item.id || index} className="row align-items-center border-bottom py-3">
                  <div className="col-md-2">
                    <div className="bg-light rounded p-3 text-center">
                      <i className="bi bi-card-text display-6 text-warning"></i>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-dark">{item.name}</h6>
                    <p className="text-muted small mb-1">
                      <strong>Registration:</strong> {item.registration || 'N/A'}
                    </p>
                    <p className="text-muted small mb-1">
                      <strong>Side:</strong> {item.side || 'Front'}
                    </p>
                    <p className="text-muted small mb-0">
                      <strong>Style:</strong> {item.styleLabel || 'Standard'}
                    </p>
                  </div>
                  <div className="col-md-2 text-center">
                    <div className="input-group input-group-sm">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || syncPending}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center" 
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={syncPending}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="fw-bold text-success">
                      £{item.price?.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="fw-bold text-dark">
                      £{(item.price * item.quantity)?.toFixed(2)}
                    </span>
                    <br />
                    <button 
                      className="btn btn-sm btn-outline-danger mt-1"
                      onClick={() => removeFromCart(item.id)}
                      disabled={syncPending}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="pt-3">
                <button 
                  className="btn btn-outline-warning"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({getCartItemCount()} items):</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>GST (18%):</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold fs-5">Total:</span>
                <span className="fw-bold fs-5 text-success">£{total.toFixed(2)}</span>
              </div>
              
              {/* Checkout Button */}
              <button 
                className="btn btn-warning btn-lg w-100 mb-3"
                onClick={handleCheckout}
                disabled={syncPending}
              >
                <i className="bi bi-credit-card me-2"></i>
                {syncPending ? 'Syncing...' : 'Proceed to Checkout'}
              </button>
              
              {/* Security & Trust Badges */}
              <div className="text-center">
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <div className="badge bg-success w-100 py-2">
                      <i className="bi bi-shield-check"></i><br />
                      <small>Secure</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="badge bg-info w-100 py-2">
                      <i className="bi bi-truck"></i><br />
                      <small>Fast Ship</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="badge bg-warning text-dark w-100 py-2">
                      <i className="bi bi-award"></i><br />
                      <small>Quality</small>
                    </div>
                  </div>
                </div>
                
                <p className="small text-muted mb-0">
                  <i className="bi bi-lock-fill me-1"></i>
                  Your payment information is processed securely via PayPal
                </p>
              </div>
            </div>
          </div>
          
          {/* Estimated Delivery */}
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body text-center">
              <h6 className="text-warning">
                <i className="bi bi-calendar-check me-2"></i>
                Estimated Delivery
              </h6>
              <p className="mb-0 fw-bold text-dark">
                5-7 Business Days
              </p>
              <small className="text-muted">
                Free standard shipping included
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;