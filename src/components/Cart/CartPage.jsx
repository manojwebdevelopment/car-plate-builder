// import React, { useState, useEffect } from 'react';
// import { X, Plus, Minus, ShoppingCart, Calculator, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { 
//     getCartItems, 
//     removeFromCart, 
//     updateCartItemQuantity, 
//     clearCart,
//     getCartTotal,
//     getCartItemCount 
// } from './cartUtils';

// const CartPage = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [couponCode, setCouponCode] = useState('');
//     const [appliedCoupon, setAppliedCoupon] = useState(null);
//     const [shippingOption, setShippingOption] = useState('tracked');
//     const [loading, setLoading] = useState(true);
    
//     const navigate = useNavigate();

//     // Load cart items from localStorage on component mount
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
//             const items = getCartItems();
//             setCartItems(items);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error loading cart items:', error);
//             setLoading(false);
//         }
//     };

//     // Remove item from cart
//     const handleRemoveItem = (id) => {
//         const result = removeFromCart(id);
//         if (result.success) {
//             setCartItems(result.cartItems);
//         }
//     };

//     // Update quantity
//     const handleUpdateQuantity = (id, newQuantity) => {
//         const result = updateCartItemQuantity(id, newQuantity);
//         if (result.success) {
//             setCartItems(result.cartItems);
//         }
//     };

//     // Clear all items
//     const handleClearCart = () => {
//         if (window.confirm('Are you sure you want to clear your cart?')) {
//             const result = clearCart();
//             if (result.success) {
//                 setCartItems(result.cartItems);
//                 setAppliedCoupon(null);
//             }
//         }
//     };

//     // Apply coupon
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

//     // Calculate totals
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
//                         {/* Cart Items */}
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
//                                                         // Fixed quantity for fixing kit - no controls
//                                                         <div className="text-center">
//                                                             <span className="fw-bold bg-success text-white px-2 py-1 rounded">
//                                                                 1 Kit
//                                                             </span>
//                                                             <div className="small text-success mt-1">
//                                                                 Fixed quantity
//                                                             </div>
//                                                         </div>
//                                                     ) : (
//                                                         // Normal quantity controls for plates
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
//                                                         // No remove button for fixing kit
//                                                         <span className="text-muted small">
//                                                             <i>Included</i>
//                                                         </span>
//                                                     ) : (
//                                                         // Normal remove button for plates
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

//                             {/* Coupon Section */}
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

//                                     <button className="btn btn-warning btn-lg w-100 fw-bold mb-3">
//                                         PROCEED TO CHECKOUT
//                                     </button>

//                                     <div className="text-center">
//                                         <small className="text-muted">
//                                             Secure checkout powered by SSL encryption
//                                         </small>
//                                     </div>
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
import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart, Calculator, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
    getCartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart,
    getCartTotal,
    getCartItemCount 
} from './cartUtils'; // Your original cartUtils

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [shippingOption, setShippingOption] = useState('tracked');
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    
    const navigate = useNavigate();

    // Load cart items from localStorage on component mount (your original logic)
    useEffect(() => {
        loadCartItems();
        
        // Listen for cart updates from other components
        const handleCartUpdate = (event) => {
            loadCartItems();
        };
        
        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const loadCartItems = () => {
        try {
            const items = getCartItems(); // Your original function
            setCartItems(items);
            setLoading(false);
        } catch (error) {
            console.error('Error loading cart items:', error);
            setLoading(false);
        }
    };

    // Remove item from cart (your original logic)
    const handleRemoveItem = (id) => {
        const result = removeFromCart(id);
        if (result.success) {
            setCartItems(result.cartItems);
        }
    };

    // Update quantity (your original logic)
    const handleUpdateQuantity = (id, newQuantity) => {
        const result = updateCartItemQuantity(id, newQuantity);
        if (result.success) {
            setCartItems(result.cartItems);
        }
    };

    // Clear all items (your original logic)
    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            const result = clearCart();
            if (result.success) {
                setCartItems(result.cartItems);
                setAppliedCoupon(null);
            }
        }
    };

    // Apply coupon (your original logic)
    const applyCoupon = () => {
        const coupons = {
            'Save15': { discount: 0.15, type: 'percentage' },
            'SAVE5': { discount: 5, type: 'fixed' }
        };
        
        if (coupons[couponCode]) {
            setAppliedCoupon({ code: couponCode, ...coupons[couponCode] });
        } else {
            alert('Invalid coupon code');
        }
    };

    // UPDATED: Handle checkout with Worldpay
    const handleCheckout = async () => {
        setCheckoutLoading(true);

        try {
            // Calculate the total amount
            const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
            const discount = appliedCoupon 
                ? appliedCoupon.type === 'percentage' 
                    ? subtotal * appliedCoupon.discount 
                    : appliedCoupon.discount
                : 0;
            const shippingCost = shippingOption === 'next-day' ? 7.99 : 0;
            const taxRate = 0.20; // 20% VAT
            const afterDiscount = subtotal - discount;
            const tax = afterDiscount * taxRate;
            const total = afterDiscount + shippingCost + tax;

            // Prepare customer info
            const customerInfo = {
                name: 'John Doe', // In real app, collect from form
                email: 'john@example.com',
                phone: '+44 123 456 7890'
            };

            // Prepare order details
            const orderDetails = {
                items: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: Math.round(item.price * 100), // Convert to pence
                    totalAmount: Math.round(item.subtotal * 100)
                })),
                quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
                subtotal: subtotal.toFixed(2),
                discount: discount.toFixed(2),
                shipping: shippingCost.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2)
            };

            console.log('Sending Worldpay checkout request:', {
                amount: total.toFixed(2),
                currency: 'GBP',
                customerInfo,
                orderDetails
            });

            // Call Worldpay endpoint instead of PayPal
            const response = await fetch('http://localhost:5000/create-worldpay-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total.toFixed(2),
                    currency: 'GBP',
                    customerInfo,
                    orderDetails
                }),
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Worldpay payment data:', data);

            if (data.success && data.paymentId) {
                // Store payment data for success page
                localStorage.setItem('pendingPayment', JSON.stringify({
                    cartItems,
                    total: total.toFixed(2),
                    appliedCoupon,
                    shippingOption,
                    paymentId: data.paymentId,
                    transactionReference: data.transactionReference,
                    provider: 'worldpay'
                }));
                
                console.log('Payment created successfully, redirecting...');
                
                // For direct API integration, redirect to success page immediately
                // In a real hosted payment page setup, you'd redirect to Worldpay's payment form
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    // Fallback redirect
                    navigate(`/payment-success?paymentId=${data.paymentId}&transactionRef=${data.transactionReference}`);
                }
            } else {
                throw new Error(data.error || 'Failed to create Worldpay payment');
            }

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed: ' + error.message + '\n\nPlease make sure the backend server is running on http://localhost:5000');
        } finally {
            setCheckoutLoading(false);
        }
    };

    // Calculate totals (your original logic)
    const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = appliedCoupon 
        ? appliedCoupon.type === 'percentage' 
            ? subtotal * appliedCoupon.discount 
            : appliedCoupon.discount
        : 0;
    const shippingCost = shippingOption === 'next-day' ? 7.99 : 0;
    const taxRate = 0.20; // 20% VAT
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * taxRate;
    const total = afterDiscount + shippingCost + tax;

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>

            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h2 className="mb-0">
                                <ShoppingCart className="me-2" size={32} />
                                Your Basket ({getCartItemCount()} items)
                            </h2>
                            <div className="d-flex gap-2">
                                <button 
                                    onClick={() => navigate('/plate-builder')}
                                    className="btn btn-outline-warning"
                                >
                                    <ArrowLeft className="me-2" size={16} />
                                    Continue Shopping
                                </button>
                                {cartItems.length > 0 && (
                                    <button 
                                        onClick={handleClearCart}
                                        className="btn btn-outline-danger"
                                    >
                                        Clear Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-5">
                        <ShoppingCart size={64} className="text-muted mb-3" />
                        <h4 className="text-muted">Your basket is empty</h4>
                        <p className="text-muted">Add some plates to get started!</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* Cart Items - Same as before */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-warning text-dark">
                                    <div className="row fw-bold">
                                        <div className="col-4">Product</div>
                                        <div className="col-2 text-center">Price</div>
                                        <div className="col-2 text-center">Quantity</div>
                                        <div className="col-3 text-center">Subtotal</div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="border-bottom p-3">
                                            <div className="row align-items-center">
                                                <div className="col-4">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="me-3 border rounded"
                                                            style={{ width: '80px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                        <div>
                                                            <h6 className="mb-1 fw-bold">{item.name}</h6>
                                                            {item.type === 'plate' && (
                                                                <div className="small text-muted">
                                                                    <div><strong>Side:</strong> {item.side} +£{item.price}</div>
                                                                    <div><strong>Registration:</strong> {item.registration}</div>
                                                                    <div><strong>Road Legal Spacing:</strong> {item.roadLegal}</div>
                                                                    <div><strong>Size:</strong> {item.size}</div>
                                                                    {item.plateStyle && <div><strong>Style:</strong> {item.plateStyle}</div>}
                                                                    {item.fontColor && <div><strong>Color:</strong> {item.fontColor}</div>}
                                                                    {item.borderStyle && item.borderStyle !== 'none' && <div><strong>Border:</strong> {item.borderStyle}</div>}
                                                                    {item.shadowEffect && item.shadowEffect !== 'none' && <div><strong>Effect:</strong> {item.shadowEffect}</div>}
                                                                </div>
                                                            )}
                                                            {item.type === 'fixing-kit' && (
                                                                <div className="small text-success fw-bold">
                                                                    Free with any plate order!
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-2 text-center">
                                                    <span className="fw-bold">
                                                        {item.price === 0 ? 'Free!' : `£${item.price.toFixed(2)}`}
                                                    </span>
                                                </div>
                                                <div className="col-2 text-center">
                                                    {item.type === 'fixing-kit' ? (
                                                        <div className="text-center">
                                                            <span className="fw-bold bg-success text-white px-2 py-1 rounded">
                                                                1 Kit
                                                            </span>
                                                            <div className="small text-success mt-1">
                                                                Fixed quantity
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="input-group" style={{ width: '120px', margin: '0 auto' }}>
                                                            <button
                                                                className="btn btn-outline-warning btn-sm"
                                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm text-center"
                                                                value={item.quantity}
                                                                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                                min="1"
                                                            />
                                                            <button
                                                                className="btn btn-outline-warning btn-sm"
                                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-3 text-center">
                                                    <span className="fw-bold">£{item.subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="col-1 text-center">
                                                    {item.type === 'fixing-kit' ? (
                                                        <span className="text-muted small">
                                                            <i>Included</i>
                                                        </span>
                                                    ) : (
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Coupon Section - Same as before */}
                            <div className="card border-0 shadow-sm mt-4">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Coupon code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <button 
                                                className="btn btn-warning w-100 fw-bold"
                                                onClick={applyCoupon}
                                            >
                                                APPLY COUPON
                                            </button>
                                        </div>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="alert alert-success mt-3 mb-0">
                                            <strong>Coupon Applied:</strong> {appliedCoupon.code} 
                                            (-£{discount.toFixed(2)})
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className="btn btn-warning btn-lg fw-bold">
                                    UPDATE BASKET
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                                <div className="card-header bg-warning text-dark">
                                    <h5 className="mb-0 fw-bold">Basket totals</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Subtotal</span>
                                        <span className="fw-bold">£{subtotal.toFixed(2)}</span>
                                    </div>

                                    {appliedCoupon && (
                                        <div className="d-flex justify-content-between mb-3 text-success">
                                            <span>Discount ({appliedCoupon.code})</span>
                                            <span className="fw-bold">-£{discount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <div className="fw-bold mb-2">Shipping</div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="shipping"
                                                id="tracked"
                                                value="tracked"
                                                checked={shippingOption === 'tracked'}
                                                onChange={(e) => setShippingOption(e.target.value)}
                                            />
                                            <label className="form-check-label small" htmlFor="tracked">
                                                <strong>Tracked Shipping (FREE)</strong> - Parcels are delivered
                                                two working days after an order has been processed.
                                            </label>
                                        </div>
                                        <div className="form-check mt-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="shipping"
                                                id="nextday"
                                                value="next-day"
                                                checked={shippingOption === 'next-day'}
                                                onChange={(e) => setShippingOption(e.target.value)}
                                            />
                                            <label className="form-check-label small" htmlFor="nextday">
                                                <strong>Next-Day Delivery (Order By 12PM): £7.99</strong> - 
                                                Orders must be placed by midday for guaranteed
                                                next-day delivery.
                                            </label>
                                        </div>
                                        <div className="form-check mt-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="shipping"
                                                id="collection"
                                                value="collection"
                                                onChange={(e) => setShippingOption(e.target.value)}
                                            />
                                            <label className="form-check-label small" htmlFor="collection">
                                                <strong>Collection (FREE)</strong> - From Westbury, Wiltshire, BA13 3QS. 
                                                Orders are ready to collect in 1 business day.
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <small className="text-muted">
                                                Shipping options will be updated during checkout.
                                            </small>
                                        </div>
                                        <div className="mt-2">
                                            <a href="#" className="text-decoration-none">
                                                <Calculator size={16} className="me-1" />
                                                Calculate shipping
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="fw-bold mb-2">Gift card</div>
                                        <a href="#" className="text-decoration-none">Apply gift card</a>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="fw-bold fs-5">Total</span>
                                        <span className="fw-bold fs-4">
                                            £{total.toFixed(2)} 
                                            <small className="text-muted">(includes £{tax.toFixed(2)} Tax)</small>
                                        </span>
                                    </div>

                                    <button 
                                        className="btn btn-warning btn-lg w-100 fw-bold mb-3"
                                        onClick={handleCheckout}
                                        disabled={checkoutLoading || cartItems.length === 0}
                                    >
                                        {checkoutLoading ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm me-2 text-dark" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <span className="text-dark">Processing Payment...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="me-2" size={20} />
                                                PAY WITH WORLDPAY
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <small className="text-muted">
                                            Secure checkout powered by Worldpay & SSL encryption
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;